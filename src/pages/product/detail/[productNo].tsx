import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { isNil, pipe, map, sum, toArray, head, slice } from '@fxts/core';
import { useLockedBody, useWindowSize } from 'usehooks-ts';

import { useAppDispatch } from 'state/reducers';
import { setCart } from 'state/slices/cartSlice';
import MainCategoryBanners from 'components/Main/MainCategoryBanners';
import LayoutResponsive from 'components/shared/LayoutResponsive';
import ProductOptionList from 'components/Product/ProductOptionList';
import RelatedProduct from 'components/Product/RelatedProduct';
import DeliveryInfo from 'components/Product/DeliveryInfo';
import AccumulationInfo from 'components/Product/AccumulationInfo';
import TotalPriceInfo from 'components/Product/TotalPriceInfo';
import ProductImageSlider from 'components/Product/ProductImageSlider';
import PrimaryButton from 'components/Button/PrimaryButton';
import ShareModal from 'components/Modal/ShareModal';
import ProductSticker from 'components/Product/ProductSticker';
import ProductPolicy from 'components/Product/ProductPolicy';
import MemberInduceModal from 'components/Modal/MemberInduceModal';
import { CHANNEL_TYPE } from 'models';
import { ProductOption, FlatOption } from 'models/product';
import { isLogin } from 'utils/users';
import { useCartMutate, useOrderSheetMutation } from 'hooks/mutations';
import {
    useBanners,
    useProductDetail,
    useProductOptionList,
} from 'hooks/queries';
import { isMobile } from 'utils/styles/responsive';
import { sortBanners } from 'utils/banners';
import media from 'utils/styles/media';
import { KRW } from 'utils/currency';
import BANNER from 'const/banner';
import PATHS from 'const/paths';
import ShareIcon from 'assets/icons/share.svg';
import AddCartIcon from 'assets/icons/add_cart.svg';
import NewIcon from 'assets/icons/new.svg';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { product } from 'api/product';

const ProductContainer = styled(LayoutResponsive)`
    max-width: 1280px;
    width: 100%;
    text-align: left;
    padding: 0 24px 0;
`;

const ProductContainerTop = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 230px;

    ${media.medium} {
        flex-direction: column;
        align-items: center;
    }
`;

const ProductImageContainer = styled.div`
    width: 52%;
    display: flex;
    position: relative;
    max-width: 661px;
    max-height: 722px;

    ${media.medium} {
        max-width: none;
        width: 100%;
    }
`;

const ProductStickerContainer = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ProductInfoContainer = styled.div`
    max-width: 510px;
    width: 40%;
    ${media.medium} {
        max-width: none;
        width: 100%;
    }
`;

const ProductInfoIconContainer = styled.div<{ isNew?: boolean }>`
    display: flex;
    justify-content: ${(props) => (props.isNew ? 'space-between' : 'flex-end')};
    align-items: center;
    margin-bottom: 10px;
`;

const ProductInfoTopContainer = styled.div`
    margin-bottom: 30px;
    ${media.medium} {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const ProductTitleBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ProductTitle = styled.h2`
    font-size: 64px;
    font-weight: bold;
    line-height: 77px;
    letter-spacing: 0;
    color: #191919;

    ${media.medium} {
        font-size: 38px;
        line-height: 46px;
    }
`;

const ProductText = styled.div`
    margin-top: 5px;
    font-size: 16px;
    color: #858585;
`;

const ProductPriceContainer = styled.div`
    display: flex;
    align-items: flex-end;
    padding-bottom: 16px;
    border-bottom: 2px solid #222943;
    margin-bottom: 30px;
`;

const SalePrice = styled.p`
    font-weight: bold;
    font-size: 40px;
    line-height: 36px;
    letter-spacing: 0;
    color: #191919;
    margin-right: 10px;

    > sub {
        font-size: 24px;
        font-weight: normal;
    }
`;

const ProductPrice = styled.span`
    font-weight: normal;
    font-size: 24px;
    line-height: 24px;
    letter-spacing: 0;
    color: #a8a8a8;
    text-decoration: line-through;

    > sub {
        text-decoration: line-through;
        font-size: 16px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    max-height: 68px;

    ${media.medium} {
        max-height: 54px;
    }
`;

const CartButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #191919;
    padding: 14px;
    height: 100%;
    margin-right: 20px;

    ${media.medium} {
        margin-right: 6px;
    }
`;

const StyledAddCartIcon = styled(AddCartIcon)`
    width: 40px;
    height: 40px;

    ${media.medium} {
        width: 24px;
        height: 24px;
    }
`;

const BuyNowButton = styled(PrimaryButton)`
    width: 100%;
    height: 100%;
    font-weight: bold;
    font-size: 24px;
    line-height: 68px;
    letter-spacing: 0;
    padding: 0;

    ${media.medium} {
        font-size: 14px;
        line-height: 54px;
    }
`;

const ProductContainerBottom = styled.div``;

const ProductContentContainer = styled.section`
    & img {
        max-width: 100%;
    }
`;

const ProductDetailTabList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: end;
    margin-bottom: 100px;
    width: 100%;
    overflow-x: scroll;
`;

const ProductDetailTabListItem = styled.li<{ selected: boolean }>`
    border-bottom: 3px solid
        ${(props) => (props.selected ? '#191919' : '#dbdbdb')};
    text-align: center;
    font-size: 24px;
    flex: 1 1 25%;
    padding: 22px 0;
    color: #191919;
    ${media.medium} {
        font-size: 16px;
        padding: 10px 0;
    }
`;

const ProductDetail = () => {
    const router = useRouter();

    const dispatch = useAppDispatch();

    const { t: productDetail } = useTranslation('productDetail');

    const productNo = router.query['productNo'] as string;

    // useEffect(() => {
    //     if (isNil(productNo)) {
    //         router.push(PATHS.MAIN);
    //     }
    // }, [productNo, router]);

    const { width } = useWindowSize();

    const [productOptionList, setProductOptionList] = useState<FlatOption[]>(
        [],
    );
    const [selectedOptionList, setSelectedOptionList] = useState<
        ProductOption[]
    >([]);
    const [selectedTab, setSelectedTab] = useState('productSummary');

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isMemberInduceModal, setIsMemberInduceModal] = useState(false);

    const productDetailData = useProductDetail({
        productNo,
    });

    useProductOptionList({
        productNo,
        options: {
            onSuccess: (data) => {
                setProductOptionList(data?.flatOptions);
            },
        },
    });

    const cartMutate = useCartMutate();

    const addCartHandler = () => {
        if (selectedOptionList.length <= 0) {
            alert('옵션을 선택해주세요.');
            return;
        }

        if (isLogin()) {
            cartMutate.mutate(
                pipe(
                    selectedOptionList,
                    map((a) => ({
                        orderCnt: a.count,
                        channelType: CHANNEL_TYPE.NAVER_EP,
                        optionInputs: [],
                        optionNo: a.optionNo,
                        productNo: parseInt(a.productNo),
                    })),
                    toArray,
                ),
            );
        } else {
            dispatch(
                setCart(
                    pipe(
                        selectedOptionList,
                        map((a) => ({
                            orderCnt: a.count,
                            channelType: CHANNEL_TYPE.NAVER_EP,
                            optionInputs: [],
                            optionNo: a.optionNo,
                            productNo: parseInt(a.productNo),
                        })),
                        toArray,
                    ),
                ),
            );
            alert(productDetail('successCartAlert'));
        }
    };

    const purchaseProducts = useMemo(
        () =>
            pipe(
                selectedOptionList,
                map((a) => ({
                    orderCnt: a.count,
                    channelType: CHANNEL_TYPE.NAVER_EP,
                    optionInputs: [],
                    optionNo: a.optionNo,
                    productNo: parseInt(a.productNo),
                })),
                toArray,
            ),
        [selectedOptionList],
    );
    const orderSheetMutation = useOrderSheetMutation();

    const purchaseHandler = async () => {
        if (selectedOptionList.length <= 0) {
            alert('옵션을 선택해주세요.');
            return;
        }

        orderSheetMutation.mutateAsync({
            trackingKey: '',
            channelType: CHANNEL_TYPE.NAVER_EP,
            products: purchaseProducts,
        });
    };

    const bannerData = useBanners({ banners: [BANNER.MAIN_CATEGORY_BANNER] });

    const productDetailTab = useMemo(
        () => [
            {
                title: 'productSummary',
                name: productDetail('productSummary'),
            },
            {
                title: 'productSpecifications',
                name: productDetail('productSpecifications'),
            },
            {
                title: 'productComparison',
                name: productDetail('productComparison'),
            },
            {
                title: 'productPolicy',
                name: productDetail('productPolicy'),
            },
        ],
        [productDetail],
    );

    const onShareButtonClick = () => {
        setIsModalVisible(true);
    };

    const totalAmount = useMemo(
        () =>
            pipe(
                selectedOptionList,
                map((a) => a.count),
                sum,
            ),
        [selectedOptionList],
    );

    const totalPrice = useMemo(
        () =>
            pipe(
                selectedOptionList,
                map((a) => a.amountPrice),
                sum,
            ),
        [selectedOptionList],
    );

    const [_, setLocked] = useLockedBody();
    useEffect(() => {
        setLocked(isMemberInduceModal);
    }, [setLocked, isMemberInduceModal]);

    return (
        <>
            {isModalVisible && (
                <ShareModal
                    width={isMobile(width) ? 'calc(100% - 48px)' : '700px'}
                    onClickToggleModal={() => setIsModalVisible(false)}
                />
            )}

            {isMemberInduceModal && (
                <MemberInduceModal
                    width={'calc(100% - 24px)'}
                    onClickToggleModal={() =>
                        setIsMemberInduceModal((prev) => !prev)
                    }
                    products={purchaseProducts}
                />
            )}

            {bannerData?.data?.[0]?.accounts && (
                <MainCategoryBanners
                    banners={sortBanners(
                        bannerData?.data[0].accounts[0].banners,
                    )}
                />
            )}

            {productDetailData.data && (
                <ProductContainer>
                    <ProductContainerTop>
                        <ProductImageContainer>
                            <ProductImageSlider
                                imageList={
                                    productDetailData.data?.baseInfo.imageUrls
                                }
                            />
                            {isMobile(width) && (
                                <ProductStickerContainer>
                                    <ProductSticker
                                        stickerInfos={pipe(
                                            productDetailData.data?.baseInfo
                                                .stickerInfos,
                                            slice(0, 3),
                                            toArray,
                                        )}
                                    />
                                </ProductStickerContainer>
                            )}
                        </ProductImageContainer>
                        <ProductInfoContainer>
                            {!isMobile(width) && (
                                <ProductInfoIconContainer isNew>
                                    {/* TODO: NewIcon은 conditional */}
                                    <NewIcon />
                                    <ShareIcon
                                        onClick={() => onShareButtonClick()}
                                    />
                                </ProductInfoIconContainer>
                            )}
                            <ProductInfoTopContainer>
                                <ProductTitleBox>
                                    <ProductTitle>
                                        {
                                            productDetailData.data?.baseInfo
                                                .productName
                                        }
                                    </ProductTitle>
                                    <ProductText>
                                        {
                                            productDetailData.data?.baseInfo
                                                .promotionText
                                        }
                                    </ProductText>
                                </ProductTitleBox>
                                {isMobile(width) && (
                                    <ShareIcon
                                        onClick={() => onShareButtonClick()}
                                    />
                                )}
                            </ProductInfoTopContainer>

                            {productDetailData.data && (
                                <ProductPriceContainer>
                                    <SalePrice
                                        dangerouslySetInnerHTML={{
                                            __html: KRW(
                                                productDetailData.data.price
                                                    .salePrice -
                                                    productDetailData.data.price
                                                        .immediateDiscountAmt,
                                                {
                                                    symbol: '<sub>원</sub>',
                                                    precision: 0,
                                                    pattern: `# !`,
                                                    negativePattern: `- # !`,
                                                },
                                            ).format(),
                                        }}
                                    />

                                    <ProductPrice
                                        dangerouslySetInnerHTML={{
                                            __html: KRW(
                                                productDetailData.data.price
                                                    .salePrice,
                                                {
                                                    symbol: '<sub>원</sub>',
                                                    precision: 0,
                                                    pattern: `# !`,
                                                    negativePattern: `- # !`,
                                                },
                                            ).format(),
                                        }}
                                    />
                                </ProductPriceContainer>
                            )}

                            {productDetailData.data?.deliveryFee && (
                                <DeliveryInfo
                                    deliveryFee={
                                        productDetailData.data.deliveryFee
                                            .deliveryAmt
                                    }
                                    remoteDeliveryFee={head(
                                        productDetailData.data.deliveryFee
                                            .remoteDeliveryAreaFees,
                                    )}
                                />
                            )}

                            <AccumulationInfo
                                accumulationAmtWhenBuyConfirm={
                                    productDetailData.data?.price
                                        .accumulationAmtWhenBuyConfirm
                                }
                            />

                            <ProductOptionList
                                productNo={productNo}
                                productOptionList={productOptionList}
                                selectedOptionList={selectedOptionList}
                                setSelectedOptionList={setSelectedOptionList}
                            />

                            <TotalPriceInfo
                                totalAmount={totalAmount}
                                totalPrice={totalPrice}
                            />

                            <ButtonContainer>
                                <CartButton onClick={addCartHandler}>
                                    <StyledAddCartIcon />
                                </CartButton>
                                <BuyNowButton
                                    disabled={orderSheetMutation.isLoading}
                                    onClick={
                                        !isLogin() && isMobile(width)
                                            ? () =>
                                                  setIsMemberInduceModal(
                                                      (prev) => !prev,
                                                  )
                                            : purchaseHandler
                                    }
                                >
                                    {orderSheetMutation.isLoading
                                        ? 'loading...'
                                        : productDetail('buyNow')}
                                </BuyNowButton>
                            </ButtonContainer>
                        </ProductInfoContainer>
                    </ProductContainerTop>

                    <ProductContainerBottom>
                        <ProductDetailTabList>
                            {productDetailTab.map(({ title, name }) => (
                                <ProductDetailTabListItem
                                    key={title}
                                    selected={selectedTab === title}
                                    onClick={() => setSelectedTab(title)}
                                >
                                    {name}
                                </ProductDetailTabListItem>
                            ))}
                        </ProductDetailTabList>

                        {selectedTab === 'productSummary' && (
                            <ProductContentContainer
                                id='productSummary'
                                dangerouslySetInnerHTML={{
                                    __html:
                                        productDetailData.data?.baseInfo
                                            .content ?? '',
                                }}
                            />
                        )}

                        {selectedTab === 'productSpecification' && (
                            <ProductContentContainer
                                id='productSpecifications'
                                dangerouslySetInnerHTML={{
                                    __html:
                                        productDetailData.data?.baseInfo
                                            .content ?? '',
                                }}
                            />
                        )}

                        {selectedTab === 'productComparison' && (
                            <ProductContentContainer
                                id='productComparison'
                                dangerouslySetInnerHTML={{
                                    __html:
                                        productDetailData.data?.baseInfo
                                            .content ?? '',
                                }}
                            />
                        )}

                        {selectedTab === 'productPolicy' && (
                            <ProductPolicy
                                productName={
                                    productDetailData.data.baseInfo.productName
                                }
                            />
                        )}

                        <RelatedProduct
                            relatedProductNos={
                                productDetailData.data?.relatedProductNos || []
                            }
                        />
                    </ProductContainerBottom>
                </ProductContainer>
            )}
        </>
    );
};

export default ProductDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();

    const productNo = context.params?.productNo as string;

    await Promise.all([
        queryClient.prefetchQuery(
            ['product_detail', { productNo }],
            async () => await product.getProductDetail(productNo),
        ),
        queryClient.prefetchQuery(
            ['productOptionList', { productNo }],
            async () => await product.getProductOption(productNo),
        ),
    ]);

    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
    };
};

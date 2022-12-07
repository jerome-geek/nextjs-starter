import { FC, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { SingleValue } from 'react-select';
import { head, pipe, filter, map, toArray, some } from '@fxts/core';

import SelectBox from 'components/Common/SelectBox';
import ProductOptionListItem from 'components/Product/ProductOptionListItem';
import SelectedOptionListItem from 'components/Product/SelectedOptionListItem';
import { FlatOption, ProductOption } from 'models/product';
import media from 'utils/styles/media';

interface ProductOptionListProps {
    productNo: string;
    productOptionList: FlatOption[];
    selectedOptionList: ProductOption[];
    setSelectedOptionList: Dispatch<SetStateAction<ProductOption[]>>;
}

const ProductOptionBox = styled.div`
    margin: 26px 0;
    border-bottom: 1px solid #000;
    padding-bottom: 26px;
    > p {
        font-size: 16px;
        color: #191919;
    }
    > select {
        margin: 22px 0;
        border: 2px solid #ababab;
        width: 100%;
        color: #ababab;
        font-size: 16px;
        padding: 15px 10px;
    }
`;

const ProductOptionDesc = styled.p`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0;
    color: #191919;
    font-weight: bold;

    ${media.medium} {
        font-weight: normal;
        letter-spacing: -0.64px;
    }
`;

const SelectedOptionList = styled.ul``;

const ProductOptionList: FC<ProductOptionListProps> = ({
    productNo,
    productOptionList,
    setSelectedOptionList,
    selectedOptionList,
}) => {
    const { t: productDetail } = useTranslation('productDetail');

    const optionSelectHandler = (
        optionValue: SingleValue<Partial<FlatOption>>,
    ) => {
        const isSelected = some(
            (a) => a.optionNo === optionValue?.optionNo,
            selectedOptionList,
        );

        if (!isSelected) {
            setSelectedOptionList((prev: any) => [
                ...prev,
                {
                    label: optionValue?.label,
                    price: optionValue?.buyPrice,
                    count: 1,
                    optionNo: optionValue?.optionNo,
                    productNo,
                    amountPrice: optionValue?.buyPrice,
                },
            ]);
        }
    };

    const productCountHandler =
        (updateCount: number, optionNo: number) => () => {
            const selectedOption = pipe(
                selectedOptionList,
                filter((a) => a.optionNo === optionNo),
                head,
            );

            if (selectedOption) {
                if (selectedOption.count + updateCount <= 0) {
                    alert(productDetail('countAlert'));
                    return;
                }

                setSelectedOptionList((prev) =>
                    pipe(
                        prev,
                        map((a) =>
                            a.optionNo === optionNo
                                ? {
                                      ...a,
                                      count: selectedOption.count + updateCount,
                                      amountPrice:
                                          selectedOption.price *
                                          (selectedOption.count + updateCount),
                                  }
                                : { ...a },
                        ),
                        toArray,
                    ),
                );
            }
        };

    const onDeleteClick = (optionNo: number) => {
        setSelectedOptionList((prev) =>
            pipe(
                prev,
                filter((a) => a.optionNo !== optionNo),
                toArray,
            ),
        );
    };

    return (
        <ProductOptionBox>
            <ProductOptionDesc>
                {productDetail('chooseOption')}
            </ProductOptionDesc>

            <SelectBox<FlatOption>
                options={productOptionList}
                onChange={optionSelectHandler}
                placeholder={'제품을 선택해주세요'}
                formatOptionLabel={(productOption) => {
                    return (
                        <ProductOptionListItem
                            imgUrl={
                                pipe(
                                    productOption.images,
                                    filter((a) => a.main),
                                    head,
                                )?.url
                            }
                            label={productOption.label}
                        />
                    );
                }}
            />

            <SelectedOptionList>
                {selectedOptionList.length > 0 &&
                    selectedOptionList.map(
                        ({ optionNo, label, amountPrice, count }) => {
                            return (
                                <SelectedOptionListItem
                                    key={optionNo}
                                    title={label}
                                    price={amountPrice || 0}
                                    count={count}
                                    onMinusButtonClick={productCountHandler(
                                        -1,
                                        optionNo,
                                    )}
                                    onPlusButtonClick={productCountHandler(
                                        +1,
                                        optionNo,
                                    )}
                                    onDeleteButtonClick={() =>
                                        onDeleteClick(optionNo)
                                    }
                                />
                            );
                        },
                    )}
            </SelectedOptionList>
        </ProductOptionBox>
    );
};

export default ProductOptionList;

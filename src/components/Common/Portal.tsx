import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
    selector: string;
}

const Portal = ({ children, selector }: PortalProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, []);

    const element =
        typeof window !== 'undefined' && document.getElementById(selector);

    return element && children && mounted
        ? createPortal(children, element)
        : null;
};

export default Portal;

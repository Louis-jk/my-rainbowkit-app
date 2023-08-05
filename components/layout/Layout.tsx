import MintButton from '../button/MintButton';
import { Head, MetaProps } from './Head';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useIsMounted } from '@/hooks/useIsMounted';

interface LayoutProps {
  children: React.ReactNode;
  customMeta?: MetaProps;
}

export const Layout = ({
  children,
  customMeta,
}: LayoutProps): JSX.Element | undefined => {
  const { isMounted } = useIsMounted();

  if (isMounted) {
    return (
      <>
        <Head customMeta={customMeta} />
        <header className="mx-auto px-5 py-5">
          <div className="flex flex-row justify-between">
            <div className="min-w-100 outline outline-1 px-10 py-2">logo</div>
            {/* wallet connect */}
            <MintButton type="top" />
            {/* // wallet connect */}
          </div>
        </header>
        <div className=" w-full divide-y divide-black divide-solid" />
        <div className="container mx-auto flex flex-col justify-center items-center px-7">
          {children}
        </div>
      </>
    );
  }
};

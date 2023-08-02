import { Box, Button, Divider, Flex } from '@chakra-ui/react';
import { Head, MetaProps } from './Head';

interface LayoutProps {
  children: React.ReactNode;
  customMeta?: MetaProps;
}

export const Layout = ({ children, customMeta }: LayoutProps): JSX.Element => {
  const innerHeaderBoxStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#333',
  };

  return (
    <>
      <Head customMeta={customMeta} />
      <header>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          padding={[2, 5, 2, 5]}
        >
          <Button
            as="a"
            target="_blank"
            variant="outline"
            href="https://chakra-ui.com"
            borderRadius={0}
          >
            logo
          </Button>
          <Button
            as="a"
            target="_blank"
            variant="outline"
            href="https://chakra-ui.com"
            borderRadius={0}
          >
            ウォレット接続
          </Button>
        </Flex>
      </header>
      <Divider />
      {children}
    </>
  );
};

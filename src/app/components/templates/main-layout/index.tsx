import { FC, ReactNode } from 'react';
import FloatingVerticalControls from '../../atoms/cutom/floating-control';
import Header from '../Header';
import Cursor from '../../atoms/cutom/custom-cursor';
import CircularText from '../../atoms/cutom/rounded-text';
import SmoothScrollWrapper from '../../atoms/cutom/scroll-wrapper';

type Props = {
  children: ReactNode;
};
const MainLayout: FC<Props> = ({ children }) => {
  return (
    <main className="relative max-w-screen overflow-x-hidden lg:px-40">
      <Cursor />
      <FloatingVerticalControls />

      <Header />
      {/* <CircularText
        text="Digital • Clixure"
        className="-top-10 -left-5 text-orange-500 hidden lg:block"
      />
      <CircularText
        text="Digital • Clixure"
        className="-bottom-10 -right-5 text-orange-500 hidden lg:block"
      /> */}
      <div className="z-10 lg:ml-16 w-full max-w-screen overflow-x-hidden">
        <main className="min-h-screen px-10 pt-24">
          <SmoothScrollWrapper>{children}</SmoothScrollWrapper>
        </main>
        <footer>asdsa</footer>
      </div>
    </main>
  );
};

export default MainLayout;

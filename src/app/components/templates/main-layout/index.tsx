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
    <main className="relative max-w-screen overflow-x-hidden ">
      <Cursor />
      <FloatingVerticalControls />

      <Header />

      <div className="z-10  w-full max-w-screen overflow-x-hidden">
        <main className="min-h-screen px-10 ">
          <SmoothScrollWrapper>{children}</SmoothScrollWrapper>
        </main>
        <footer>asdsa</footer>
      </div>
    </main>
  );
};

export default MainLayout;

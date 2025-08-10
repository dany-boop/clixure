import { FC, ReactNode } from 'react';
import FloatingVerticalControls from '../../atoms/cutom/floating-control';
import Header from '../Header';
import Cursor from '../../atoms/cutom/custom-cursor';

type Props = {
  children: ReactNode;
};
const MainLayout: FC<Props> = ({ children }) => {
  return (
    <main className="relative max-w-screen overflow-x-hidden mx-40">
      <Cursor />
      <FloatingVerticalControls />

      <Header />
      <div className="z-10 ml-16 w-full max-w-screen overflow-x-hidden">
        <main className="min-h-screen px-10 pt-24">{children}</main>
        <footer>asdsa</footer>
      </div>
    </main>
  );
};

export default MainLayout;

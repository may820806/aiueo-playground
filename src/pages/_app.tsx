import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import "primereact/resources/primereact.min.css";
import 'primereact/resources/themes/viva-light/theme.css';
import 'primeicons/primeicons.css';
import CustomToastAlert from '../components/CustomizedToastAlert';
import { RecoilRoot } from 'recoil';
import { ConfirmDialog } from 'primereact/confirmdialog';
import Header from '@/components/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Header />
      <CustomToastAlert />
      <ConfirmDialog />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'primereact/resources/themes/viva-light/theme.css';
import CustomToastAlert from '../components/CustomizedToastAlert';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <CustomToastAlert />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

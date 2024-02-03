import '@styles/globals.css'

import Nav from '@components/Nav';
import Provider from '@components/Provider';
import Footer from '@components/Footer';
import Sidebar from '@components/Sidebar';

export const metadata = {
    title: 'Miva EdTech',
    description: "Miva EdTech Assessment."
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <div className='main'>
                    <div className='gradient' />
                </div>

                <main className='app relative flex flex-col min-h-screen'>
                    <Nav/>
                    <Sidebar/>
                    <div className='flex-grow flex-1'>{children}</div>
                    <Footer/>
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;
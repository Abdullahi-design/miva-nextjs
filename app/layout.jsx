import '@styles/globals.css'

import Nav from '@components/Nav';
import Provider from '@components/Provider';
import Footer from '@components/Footer';

export const metadata = {
    title: 'Hudsuller',
    description: "Africa's first B2C e-commerce platform that allows creators to sell products directly to their audience."
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
                    <div className='flex-grow flex-1'>{children}</div>
                    <Footer/>
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;
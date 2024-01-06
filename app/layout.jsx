import '@styles/globals.css'

import Nav from '@components/Nav';
import Provider from '@components/Provider';

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

                <main className='app'>
                    <Nav/>
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;
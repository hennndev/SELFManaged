import React from 'react'
import {
    Html,
    Head,
    Body,
    Preview,
    Container,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'

const EmailWrapper = ({title, children}: {title: string, children: React.ReactNode}) => {
    return (
        <Html>
            <Head/>
            <Preview>{title}</Preview>
            <Body style={main}>
                <Container style={container}>
                    {children}
                </Container>
            </Body>
        </Html>
    )
}

export default EmailWrapper

const main = {
    backgroundColor: '#ffffff',
    padding: '20px',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
};
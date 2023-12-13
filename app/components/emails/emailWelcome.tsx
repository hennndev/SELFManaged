import React from 'react'
import EmailWrapper from './emailWrapper'
import { Heading, Section, Text, Hr, Img, Container } from '@react-email/components'

const EmailWelcome = () => {
    return (
        <EmailWrapper title='Thankyou for register new account to SELFManaged. Feel free to explore and ask to our team for getting support.'>
            <Section style={box}>
                <Heading style={heading}>
                    Welcome to SELFManaged 🔥
                </Heading>
                <Container style={{textAlign: 'center' as const}}>
                    <Text style={paragraph}>#palestine_will_be_free</Text>
                </Container>
                <Container>
                    <Img style={image} height={300} src='https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1'/>
                </Container>
                <Text style={paragraph}>Welcome to SELFManaged. Thankyou for register new account to our web app. I will explian little bit about our product. Our product will help you increase your productivity and even support your activity. We have 2 option about our product, free plan and premium plan ($20). Feel free to explore our product.</Text>
                <Text style={paragraph}>
                    Best,
                    <br />
                    Hendra Kece Badai
                </Text>
                <Hr style={hr} />
                <Text style={footer}>Purbalingga, Jawa Tengah, Indonesia</Text>
            </Section>
        </EmailWrapper>
    )
}

export default EmailWelcome

const box = {
    backgroundColor: '#111',
    padding: '15px 25px',
    borderRadius: '6px',
}

const heading = {
    textAlign: 'center' as const,
    color: '#fff',
    fontSize: '25px',
    fontWeight: 'bold'
}

const image = {
    width: '100%',
    objectFit: 'contain' as const
}

const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
    color: '#fff'
  };

  const hr = {
    borderColor: '#222',
    margin: '20px 0',
  };
  
  const footer = {
    color: '#fff',
    fontSize: '12px',
  };
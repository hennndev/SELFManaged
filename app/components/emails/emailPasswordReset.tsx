import React from 'react'
import EmailWrapper from './emailWrapper'
import { Heading, Section, Text, Button, Hr, Img, Container } from '@react-email/components'

const EmailPasswordReset  = ({link, name}: {link: string, name: string}) => {
    return (
        <EmailWrapper title='You will be guide how to change password while you forgot about your password.'>
            <Section style={box}>
                <Heading style={heading}>
                    Did you forgot your password?
                </Heading>
                <Container>
                    <Img style={image} height={300} src='https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1'/>
                </Container>
                <Text style={paragraph}>Hi, {name}</Text>
                <Text style={paragraph}>We already reset your password account. You can freely change your password account by click this link. This request just have 5 minutes for secure your account. You will redirect to change password page. 👌</Text>
                <Button href={link} style={button}>
                    Change password
                </Button>
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
export default EmailPasswordReset

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
}

const button = {
    backgroundColor: '#6E32BF',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '8px 12px',
    marginTop: '5px'
}

const hr = {
    borderColor: '#222',
    margin: '20px 0',
}
  
const footer = {
    color: '#fff',
    fontSize: '12px',
}
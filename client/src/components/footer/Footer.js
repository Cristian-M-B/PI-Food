import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import styled from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styled.container}>
            <p>Cristian Baronetto</p>
            <a href='https://www.linkedin.com/in/cristian-baronetto' target='_blank' rel='noreferrer'><BsLinkedin /></a>
        </footer>
    )
}

import React from 'react';
import { BsLinkedin, BsFillBriefcaseFill, BsFileEarmarkPdf } from 'react-icons/bs';
import styled from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styled.container}>
            <p>Cristian Baronetto</p>
            <div>
                <a href='https://www.linkedin.com/in/cristian-baronetto' target='_blank' rel='noreferrer'><BsLinkedin /></a>
                <a href='https://cristianbaronetto.vercel.app/' target='_blank' rel='noreferrer'><BsFillBriefcaseFill /></a>
                <a href='https://drive.google.com/file/d/1RxU-PS31Dnl6xrYCbIyAXI9s51hlbREu/view' target='_blank' rel='noreferrer'><BsFileEarmarkPdf /></a>
            </div>
        </footer>
    )
}

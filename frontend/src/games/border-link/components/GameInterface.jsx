import { useState, useEffect, useRef } from 'react';
import styles from './GameInterface.module.css';
import { useNavigate } from 'react-router-dom';

export default function GameInterface() {
  const navigate = useNavigate();

  return (
    <div className={styles.gameInterface}>

    </div>
  );
}
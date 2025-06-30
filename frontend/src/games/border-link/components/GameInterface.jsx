import { useState, useEffect, useRef } from 'react';
import styles from './GameInterface.module.css';
import { useNavigate } from 'react-router-dom';

function levenshteinDistance(s1, s2) {
  const l1 = s1.length;
  const l2 = s2.length;

  const dp = [];
  for(let i = 0; i <= l1; i++){
    const row = [];
    for(let j = 0; j <= l2; j++){
      row.push(0);
    }
    dp.push(row);
  }

  for(let i = 0; i <= l1; i++)
    dp[i][0] = i;

  for(let i = 0; i <= l2; i++)
    dp[0][i] = i;

  for(let i = 1; i <= l1; i++){
    for(let j = 1; j <= l2; j++){
      let cost;
      if(s1[i-1] === s2[j-1])
        cost = 0;
      else
        cost = 1;

      dp[i][j] = Math.min(
          dp[i-1][j] + 1,
          dp[i][j-1] +1,
          dp[i-1][j-1] + cost
      )
    }
  }
  return dp[l1][l2];
}

function similarity(s1, s2){
  return 1 - levenshteinDistance(s1,s2)/Math.max(s1.length,s2.length);
}

export default function GameInterface() {
  const navigate = useNavigate();

  /*
  const handleKeyDown (e) => {
    if(e.key === 'Enter'){

    }
  }
   */

  return (
    <div className={styles.gameInterface}>
      <div className={styles.selectedCountriesPanel}>
        Hello
      </div>
    </div>
  );
}
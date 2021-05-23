import React, { FC } from 'react';

import './styles.css';

export interface GasBpmAlertProps {
  level: number;
  type: 'gas' | 'bpm';
  label: string;
}

const GasBpmAlert: FC<GasBpmAlertProps> = ({ level, type, label }) => {

  function getClassName(): string {
    if (type === 'bpm') {
      return getBPMClassName();
    }

    else {
      if (label  === 'CO') {
        return getCOClassName();
      }

      else {
        return getGLPClassName();
      }
    }
  }

  function getCOClassName(): string {
    if (level > 50) {
      return 'perigo';
    } else {
      if (level > 30) {
        return 'alerta';
      } else {
        return 'ok';
      }
    }
  }

  function getGLPClassName(): string {
    if (level > 1000) {
      return 'perigo';
    } else {
      if (level > 500) {
        return 'alerta';
      } else {
        return 'ok';
      }
    }
  }

  function getBPMClassName(): string {
    if (level > 140) {
      return 'perigo';
    } else {
      if (level > 120) {
        return 'alerta';
      } else {
        return 'ok';
      }
    }
  }

  return (
    <>
      <div className="alert">
        <strong className={type === 'gas' ? 'regular' : 'small'}>{label}: </strong>

        {(level) ? 
          <p className={ 'alert ' + getClassName()}>{level.toFixed(2)} {type === 'gas' ? 'ppm' : 'bpm'}</p>
        : 
          <p className="alert null">N/A {type === 'gas' ? 'ppm' : 'bpm'}</p>
        }

      </div>
    </>
  )
}

export default GasBpmAlert;
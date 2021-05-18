import React, { FC } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom'
import GasBpmAlert from '../GasBpmAlert';

import './styles.css';

export interface ModuleProps {
  module: string;
  co: number;
  glp: number;
  bpm: number;
}

const Module: FC<ModuleProps> = ({ module, co, glp, bpm }) => {
  return (
    <div className="module-container">
      <div className="module" key={module}>
        <div className="name">
          <strong>Módulo: </strong>
          <p>{module}</p>
        </div>
        

        <GasBpmAlert label={'CO'} level={co} type={'gas'}/>
        <GasBpmAlert label={'GLP'} level={glp} type={'gas'}/>
        <GasBpmAlert label={'Frequência cardíaca'} level={bpm} type={'bpm'}/>

      </div>

      <Link to={`/dados/${module}`} >
        <FiChevronRight/>
      </Link>

    </div>
  )
}

export default Module;
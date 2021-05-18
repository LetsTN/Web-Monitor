import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import api from '../../shared/services/api';
import Header from '../../components/Header';
import DataChart from '../../components/DataChart';

import './styles.css';


// Aqui definimos quais estados que o componente vai ter, e quais serão os tipos deles
type GraphicsState = {
  co: any[]
  glp: any[]
  bpm: any[]
}

// Aqui definimos quais as propriedades que vamos precisar e os tipos delas
type GraphicsProps = {
  match: {
    params: {
      module: string; 
    }
  }
}

// Graphics tem propriedades do tipo GraphicsProps, e o estado atual é do tipo GraphicsState
// Os parâmetros genéricos na tipagem do Component permitem passar props
// e states. Nesse caso, vamos estar esperando receber o nome do módulo na rota, 
// então vamos ter props no primeiro parametro
export class Graphics extends Component<GraphicsProps, GraphicsState> {

  // A função tick define o estado atual. TypeScript nos informará
  // quais estados podemos setar (definimos lá em cima)
  // -- não nescessariamente precisamos setar todos os estados definidos --
  async tick(module: string) {
    const response = await api.get(`reading/${module}`);

    this.setState({
      co: response.data.readings.co || [],
      glp: response.data.readings.glp || [],
      bpm: response.data.readings.bpm || [],
    });
  }

  // Após a montagem do componente, mudaremos o estado dele a cada 5 segundos
  async componentDidMount() {

    const module = this.props.match.params.module;

    console.log(module);

    // inicializamos nosso state
    await this.tick(module);
    
    setInterval(async () => await this.tick(module), 5000);
  }

  // e renderiza! (tadah!)
  render() {
    return (
      <div className="container">
        <Header/>
        <h1 className="display"><Link to="/dashboard">Dashboard</Link> &gt; Graphics</h1>

        {(this.state ? 
          
          <div className="chart-area">
            <div className="chart">
              <DataChart label={'Gráfico de leituras de CO:'} data={this.state.co} valueType={'ppm'}/>
            </div>

            <div className="chart">
              <DataChart label={'Gráfico de leituras de GLP:'} data={this.state.glp} valueType={'ppm'}/>
            </div>

            <div className="chart">
              <DataChart label={'Gráfico de leituras de Batimentos cardíacos:'} data={this.state.bpm} valueType={'bpm'}/>
            </div>

          </div>
          
        : null )}

        
      </div>
    )
  }
}

export default Graphics;
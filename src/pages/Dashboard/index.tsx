import React, { Component } from 'react';
import api from '../../shared/services/api';
import Module from '../../components/Module';
import Header from '../../components/Header';

import './styles.css';


// Aqui definimos quais estados que o componente vai ter, e quais serão os tipos deles
type DashboardState = {
  readings: any;
  modules: string[];
}

// Dashboard não tem propriedades, mas o estado atual é do tipo DashboardState
// Os parâmetros genéricos na tipagem do Component permitem passar props
// e states. Como n tem propriedades nesse caso, passamos um objeto vazio
export class Dashboard extends Component<{}, DashboardState> {

  // A função tick define o estado atual. TypeScript nos informará
  // quais estados podemos setar (definimos lá em cima)
  // -- não nescessariamente precisamos setar todos os estados definidos --
  async tick() {
    const response = await api.get('reading');
    console.log(response);

    this.setState({
      readings: response.data.readings || {},
      modules: Object.keys(response.data.readings) || []
    });
  }

  // Após a montagem do componente, mudaremos o estado dele a cada 5 segundos
  async componentDidMount() {
    // inicializamos nosso state
    await this.tick();
    
    setInterval(async () => await this.tick(), 5000);
  }

  // e renderiza! (tadah!)
  render() {
    return (
      <div className="container">
        <Header/>
        <h1 className="display">Dashboard</h1>

        {(this.state ? this.state.modules.map(module => 

          <Module 
            module={module} 
            co={this.state.readings[module].co}
            glp={this.state.readings[module].glp}
            bpm={this.state.readings[module].bpm}
            key={module}
          />

        ) : null )}
      </div>
    )
  }
}

export default Dashboard;
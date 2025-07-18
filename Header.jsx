import React, { useState, useEffect } from 'react';


function Header({ data, setData }) {

  const [horaAtual, setHoraAtual] = useState(new Date());
    useEffect(() => {
        const timerId = setInterval(() => {
          const novaHora = new Date();
          setHoraAtual(novaHora);
          
          setData(prevData => ({
            ...prevData,
            horario: novaHora.toLocaleTimeString('pt-BR')
          }));
        }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [setData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  return (
    <fieldset>
      <legend>Informações Gerais</legend>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="data">Data:</label>
          <input
            type="date"
            id="data"
            name="data"
            value={data.data}
            onChange={handleChange}
          />
        </div>
      </div>
        <div className="form-group">
          <label htmlFor="turno">Turma:</label>
          <select
            id="turma"
            name="turma"
            value={data.turma}
            onChange={handleChange}
          >
            <option value="">Selecione a Turma</option>
            <option value="A">Turma A</option>
            <option value="B">Turma B</option>
            <option value="C">Turma C</option>
            <option value="D">Turma D</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="ajustador">Ajustador:</label>
          <select
            id="ajustador"
            name="ajustador"
            value={data.ajustador}
            onChange={handleChange}
            >
            <option value="Matheus">Matheus Bezerra</option>
            <option value="Caio">Caio Siqueira</option>
            <option value="Victor">Victor Gama</option>
            <option value="Celso">Celso</option>
            <option value="Janiel">Janiel Pereira</option>
            <option value="Warlem">Warlem Laranjeira</option>

          </select>
        <div className="form-group">
          <label htmlFor="operador">Operador:</label>
          <input
            type="text"
            id="operador"
            name="operador"
            value={data.operador}
            onChange={handleChange}
            ></input>
        </div>
        <div className="form-group">
          <label htmlFor="situacao">Hora:</label>
          <div className="real-time">
            {horaAtual.toLocaleTimeString('pt-BR')}
          </div>
        </div>
      </div>
    </fieldset>
  );
}

export default Header;
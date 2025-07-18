import React from 'react';

function ControleLata({ data, setData }) {
  const fields = [
      'pesoLataLisa', 'pesoSaia', 'pesoMedioSaia', 'maxFlange', 'minFlange', 'mediaFlange', 'variacaoFlange',
      'estirMiddleDie', 'paredeMax', 'paredeMinIndividual', 'mediaParede', 'variacaoParede', 'estirEndDie'
  ];

  const handleInputChange = (e, bm, field) => {
    const { value } = e.target;
    setData(prevData => {
      const updatedData = prevData.map(row => {
        if (row.bm === bm) {
          return { ...row, [field]: value };
        }
        return row;
      });
      return updatedData;
    });
  };

  return (
    <fieldset>
      <legend>CONTROLE DE LATA</legend>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th rowSpan="2">PARÂMETROS</th>
              <th colSpan="3">PESO DA LATA</th>
              <th colSpan="5">FLANGE</th>
              <th colSpan="5">PAREDE</th>
            </tr>
            <tr>
              <th>PESO LATA LISA</th>
              <th>PESO DA SAIA</th>
              <th>PESO MÉDIO DA SAIA</th>
              <th>MÁX. FLANGE</th>
              <th>MIN. FLANGE</th>
              <th>MÉDIA FLANGE</th>
              <th>VARIAÇÃO</th>
              <th>% ESTIR. MIDDLE DIE</th>
              <th>PAREDE MÁX.</th>
              <th>PAREDE MÍN. INDIVIDUAL</th>
              <th>MÉDIA PAREDE</th>
              <th>VARIAÇÃO</th>
              <th>% ESTIR. END DIE</th>
            </tr>
          </thead>
          <tbody>
            {data.map(rowData => (
              <tr key={rowData.bm}>
                <td>{rowData.bm}</td>
                {fields.map(field => (
                  <td key={field}>
                    <input
                      type="number"
                      step="any"
                      value={rowData[field] || ''}
                      onChange={(e) => handleInputChange(e, rowData.bm, field)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </fieldset>
  );
}

export default ControleLata;
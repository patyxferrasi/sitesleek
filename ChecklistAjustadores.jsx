import React from 'react';

function ChecklistAjustadores({ data, setData }) {
  const bms = ['BM 11', 'BM 12', 'BM 13', 'BM 14', 'BM 15'];
  const bms_ext = ['BM 21', 'BM 22', 'BM 23', 'BM 24', 'BM 25', 'BM 26'];
  const kanbanItems = ['Air bag', 'Connecting link', 'Cam Lever', 'Yoke slide'];

  const handleKanbanChange = (e, item) => {
    const { value } = e.target;
    setData(prevData => ({
      ...prevData,
      kanban: {
        ...prevData.kanban,
        [item]: value,
      }
    }));
  };
  
  const handleSealPackChange = (e, bm) => {
    const { value } = e.target;
    setData(prevData => ({
        ...prevData,
        sealPack: {
            ...prevData.sealPack,
            [bm]: value,
        }
    }));
  };

  const handleGenericChange = (e, section, field) => {
    const { value } = e.target;
    setData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value
      }
    }));
  };

  return (
    <fieldset>
      <legend>CHECK LIST AJUSTADORES</legend>
      <div className="table-container">
        <h3>MONITORAMENTO KANBAN CONJUNTOS BM</h3>
        <table>
          <thead>
            <tr>
              <th>Componente</th>
              <th>Qtd.</th>
            </tr>
          </thead>
          <tbody>
            {kanbanItems.map(item => (
              <tr key={item}>
                <td>{item}</td>
                <td><input type="number" value={data.kanban[item] || ''} onChange={(e) => handleKanbanChange(e, item)} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>SEAL PACK</h3>
        <table>
            <thead>
                <tr>
                    {bms.map(bm => <th key={bm}>{bm}</th>)}
                    {bms_ext.map(bm => <th key={bm}>{bm}</th>)}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {bms.map(bm => <td key={bm}><input type="number" value={data.sealPack[bm] || ''} onChange={(e) => handleSealPackChange(e, bm)} /></td>)}
                    {bms_ext.map(bm => <td key={bm}><input type="number" value={data.sealPack[bm] || ''} onChange={(e) => handleSealPackChange(e, bm)} /></td>)}
                </tr>
            </tbody>
        </table>
        
        <h3>MONITORAMENTO MANUTENÇÃO TRIMMER</h3>
         <table>
            <thead>
                <tr>
                    <th>CABEÇAS DE TRIMMER RESERVA</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="number" value={data.trimmer.reserva || ''} onChange={(e) => handleGenericChange(e, 'trimmer', 'reserva')} /></td>
                </tr>
            </tbody>
        </table>

        <h3>CONCENTRAÇÃO DE ÓLEO OVERBECK</h3>
        <table>
            <thead>
                <tr>
                    <th>Mínimo</th>
                    <th>Efetivo</th>
                    <th>Máximo</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="number" step="0.001" value={data.oleo.minimo || ''} onChange={(e) => handleGenericChange(e, 'oleo', 'minimo')} /></td>
                    <td><input type="number" step="0.001" value={data.oleo.efetivo || ''} onChange={(e) => handleGenericChange(e, 'oleo', 'efetivo')} /></td>
                    <td><input type="number" step="0.001" value={data.oleo.maximo || ''} onChange={(e) => handleGenericChange(e, 'oleo', 'maximo')} /></td>
                </tr>
            </tbody>
        </table>
      </div>
    </fieldset>
  );
}

export default ChecklistAjustadores;
import React from 'react';

function PreventivaFerramentas({ data, setData }) {
  const toolFields = ['Nose', 'Cruza', 'L', 'Tp', 'P', 'R', 'F', 'M', 'E'];

  const handleInputChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const list = [...data];
    list[index][name] = type === 'checkbox' ? (checked ? 1 : 0) : value;
    setData(list);
  };
  
  const handleAddRow = () => {
    const newRow = { 
        id: new Date().getTime(),
        executante: '', 
        maquina: '', 
        Nose: 0, Cruza: 0, L: 0, Tp: 0, P: 0, R: 0, F: 0, M: 0, E: 0, 
        descricao: '', 
        horario: '' 
    };
    setData([...data, newRow]);
  };
  
  const handleRemoveRow = (index) => {
    const list = [...data];
    list.splice(index, 1);
    setData(list);
  };

  return (
    <fieldset>
      <legend>PREVENTIVA DIÁRIA DE FERRAMENTAS</legend>
      <button type="button" onClick={handleAddRow} className="add-button">Adicionar Ação</button>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>EXECUTANTE</th>
              <th>MÁQUINA</th>
              {toolFields.map(field => <th key={field}>{field}</th>)}
              <th>DESCRIÇÃO DETALHADA</th>
              <th>HORÁRIO</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.id} className="preventiva-row">
                <td>
                  <select name="executante" value={row.executante} onChange={(e) => handleInputChange(e, index)}> 
                    <option value="Matheus">Matheus Bezerra</option>
                    <option value="Caio">Caio Siqueira</option>
                    <option value="Victor">Victor Gama</option>
                    <option value="Celso">Celso</option>
                    <option value="Janiel">Janiel Pereira</option>
                    <option value="Warlem">Warlem Laranjeira</option>
                  </select> 
                </td>
                <td><select name="maquina" value={row.maquina} onChange={(e) => handleInputChange(e, index)}>
                    <option value="BM11">BM11</option>
                    <option value="BM11">BM12</option>
                    <option value="BM11">BM13</option>
                    <option value="BM11">BM14</option>
                    <option value="BM11">BM15</option>
                    <option value="BM11">BM21</option>
                    <option value="BM11">BM22</option>
                    <option value="BM11">BM23</option>
                    <option value="BM11">BM24</option>
                    <option value="BM11">BM25</option>
                    <option value="BM11">BM26</option>
                  </select> </td>
                {toolFields.map(field => (
                  <td key={field}>
                    <input type="checkbox" name={field} checked={row[field] === 1} onChange={(e) => handleInputChange(e, index)} />
                  </td>
                ))}
                <td><input type="text" name="descricao" value={row.descricao} onChange={(e) => handleInputChange(e, index)} /></td>
                <td><input type="time" name="horario" value={row.horario} onChange={(e) => handleInputChange(e, index)} /></td>
                <td><button type="button" onClick={() => handleRemoveRow(index)} className="remove-button">Remover</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </fieldset>
  );
}

export default PreventivaFerramentas;
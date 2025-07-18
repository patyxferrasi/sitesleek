import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Header from './components/Header';
import ChecklistAjustadores from './components/ChecklistAjustadores';
import ControleLata from './components/ControleLata';
import PreventivaFerramentas from './components/PreventivaFerramentas';

function App() {
    const bms = ['BM 11', 'BM 12', 'BM 13', 'BM 14', 'BM 15', 'BM 21', 'BM 22', 'BM 23', 'BM 24', 'BM 25', 'BM 26'];
    const initialControleLata = bms.map(bm => ({
        bm: bm,
        pesoLataLisa: '', pesoSaia: '', pesoMedioSaia: '', maxFlange: '', minFlange: '', mediaFlange: '', variacaoFlange: '',
        estirMiddleDie: '', paredeMax: '', paredeMinIndividual: '', mediaParede: '', variacaoParede: '', estirEndDie: ''
    }));

    const [headerData, setHeaderData] = useState({
        data: '',
        turno: '',
        ajustador: '',
        horario: new Date().toLocaleTimeString('pt-BR')
    });

    const [checklistData, setChecklistData] = useState({
        kanban: {},
        sealPack: {},
        trimmer: { reserva: '' },
        oleo: { minimo: '0.04', efetivo: '', maximo: '0.05' }
    });
    
    const [controleLataData, setControleLataData] = useState(initialControleLata);
    
    const [preventivaData, setPreventivaData] = useState([]);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Organizar os dados para a aba "Resumo"
        const resumoData = [
            { Campo: 'Data', Valor: headerData.data },
            { Campo: 'Turno', Valor: headerData.turno },
            { Campo: 'Ajustador', Valor: headerData.ajustador },
            { Campo: 'Horário do Relatório', Valor: headerData.horario },
            { Campo: '--- CHECKLIST ---', Valor: '' },
            { Campo: 'Cabeças de Trimmer Reserva', Valor: checklistData.trimmer.reserva },
            { Campo: 'Concentração Óleo Mínimo', Valor: checklistData.oleo.minimo },
            { Campo: 'Concentração Óleo Efetivo', Valor: checklistData.oleo.efetivo },
            { Campo: 'Concentração Óleo Máximo', Valor: checklistData.oleo.maximo },
            { Campo: '--- KANBAN ---', Valor: '' },
            ...Object.entries(checklistData.kanban).map(([key, value]) => ({ Campo: key, Valor: value })),
            { Campo: '--- SEAL PACK ---', Valor: '' },
            ...Object.entries(checklistData.sealPack).map(([key, value]) => ({ Campo: key, Valor: value })),
        ];

        // 2. Criar as "planilhas" (worksheets)
        const wsResumo = XLSX.utils.json_to_sheet(resumoData);
        const wsControleLata = XLSX.utils.json_to_sheet(controleLataData);
        const wsPreventiva = XLSX.utils.json_to_sheet(preventivaData);

        // 3. Criar o "livro" (workbook) e adicionar as planilhas como abas
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, wsResumo, 'Resumo');
        XLSX.utils.book_append_sheet(wb, wsControleLata, 'Controle de Lata');
        XLSX.utils.book_append_sheet(wb, wsPreventiva, 'Preventiva');

        // 4. Gerar o arquivo e iniciar o download
        const dataFormatada = headerData.data || new Date().toISOString().split('T')[0];
        XLSX.writeFile(wb, `Relatorio-Mecanica-${dataFormatada}.xlsx`);
    };

    return (
        <div className="App">
            <h1>RELATÓRIO DE MANUTENÇÃO FRONT END</h1>
            <form onSubmit={handleSubmit}>
                <Header data={headerData} setData={setHeaderData} />
                <ChecklistAjustadores data={checklistData} setData={setChecklistData} />
                <ControleLata data={controleLataData} setData={setControleLataData} />
                <PreventivaFerramentas data={preventivaData} setData={setPreventivaData} />
                <button type="submit" className="final-submit">Salvar Relatório</button>
            </form>
        </div>
    );
}

export default App;
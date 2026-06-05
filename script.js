// ===== ARMAZENAMENTO DE DADOS =====
const STORAGE_KEYS = {
    gestantes: 'caderneta_gestantes',
    criancas: 'caderneta_criancas',
    hipertensos: 'caderneta_hipertensos',
    diabeticos: 'caderneta_diabeticos',
    idosos: 'caderneta_idosos',
    perfil: 'caderneta_perfil',
    unidade: 'caderneta_unidade'
};

// ===== FUNÇÕES DE ARMAZENAMENTO =====
function salvarDados(chave, dados) {
    try {
        localStorage.setItem(chave, JSON.stringify(dados));
        mostrarAlerta('Dados salvos com sucesso!', 'success');
        return true;
    } catch (erro) {
        console.error('Erro ao salvar:', erro);
        mostrarAlerta('Erro ao salvar dados!', 'error');
        return false;
    }
}

function carregarDados(chave) {
    try {
        const dados = localStorage.getItem(chave);
        return dados ? JSON.parse(dados) : [];
    } catch (erro) {
        console.error('Erro ao carregar:', erro);
        return [];
    }
}

// ===== FUNÇÕES DE UI =====
function mostrarAlerta(mensagem, tipo = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${tipo}`;
    alertDiv.textContent = mensagem;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.maxWidth = '400px';
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// ===== GESTANTES =====
const formGestante = document.getElementById('formGestante');
if (formGestante) {
    formGestante.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const gestante = {
            id: Date.now(),
            nome: document.getElementById('nomeGestante').value,
            idade: document.getElementById('idadeGestante').value,
            dum: document.getElementById('dumGestante').value,
            dpp: document.getElementById('dppGestante').value,
            peso: document.getElementById('pesoGestante').value,
            altura: document.getElementById('alturaGestante').value,
            pa: document.getElementById('paGestante').value,
            glicemia: document.getElementById('glicemiaGestante').value,
            acs: document.getElementById('acsGestante').value,
            enfermeira: document.getElementById('enfermeirasGestante').value,
            tecnica: document.getElementById('tecnicaGestante').value,
            data_cadastro: new Date().toLocaleDateString('pt-BR')
        };
        
        const gestantes = carregarDados(STORAGE_KEYS.gestantes);
        gestantes.push(gestante);
        
        if (salvarDados(STORAGE_KEYS.gestantes, gestantes)) {
            formGestante.reset();
            carregarListaGestantes();
            atualizarDashboard();
        }
    });
}

function carregarListaGestantes() {
    const listaDiv = document.getElementById('listaGestantes');
    if (!listaDiv) return;
    
    const gestantes = carregarDados(STORAGE_KEYS.gestantes);
    
    if (gestantes.length === 0) {
        listaDiv.innerHTML = '<p style="text-align: center; color: var(--cinza-meio);">Nenhuma gestante cadastrada ainda.</p>';
        return;
    }
    
    listaDiv.innerHTML = gestantes.map(g => `
        <div style="background: var(--cinza-claro); padding: 1rem; margin-bottom: 1rem; border-radius: 6px; border-left: 4px solid var(--azul-principal);">
            <h4>${g.nome}</h4>
            <p><strong>Idade:</strong> ${g.idade} anos</p>
            <p><strong>DUM:</strong> ${g.dum || 'Não informado'}</p>
            <p><strong>DPP:</strong> ${g.dpp || 'Não informado'}</p>
            <p><strong>PA:</strong> ${g.pa || 'Não informado'}</p>
            <p><strong>Cadastro:</strong> ${g.data_cadastro}</p>
            <button onclick="editarGestante(${g.id})" class="btn btn-secondary" style="margin-top: 0.5rem;">Editar</button>
            <button onclick="deletarGestante(${g.id})" class="btn btn-secondary" style="margin-top: 0.5rem; background-color: #f8d7da; color: #721c24;">Deletar</button>
        </div>
    `).join('');
}

function deletarGestante(id) {
    if (confirm('Tem certeza que deseja deletar este registro?')) {
        const gestantes = carregarDados(STORAGE_KEYS.gestantes);
        const filtradas = gestantes.filter(g => g.id !== id);
        salvarDados(STORAGE_KEYS.gestantes, filtradas);
        carregarListaGestantes();
        atualizarDashboard();
    }
}

// ===== CRIANÇAS =====
const formCrianca = document.getElementById('formCrianca');
if (formCrianca) {
    formCrianca.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const crianca = {
            id: Date.now(),
            nome: document.getElementById('nomeCrianca').value,
            dataNasc: document.getElementById('dataNascCrianca').value,
            mae: document.getElementById('nomeMae').value,
            microarea: document.getElementById('microarea').value,
            peso: document.getElementById('pesoCrianca').value,
            altura: document.getElementById('alturaCrianca').value,
            data_cadastro: new Date().toLocaleDateString('pt-BR')
        };
        
        const criancas = carregarDados(STORAGE_KEYS.criancas);
        criancas.push(crianca);
        
        if (salvarDados(STORAGE_KEYS.criancas, criancas)) {
            formCrianca.reset();
            carregarListaCriancas();
            atualizarDashboard();
        }
    });
}

function carregarListaCriancas() {
    const listaDiv = document.getElementById('listaCriancas');
    if (!listaDiv) return;
    
    const criancas = carregarDados(STORAGE_KEYS.criancas);
    
    if (criancas.length === 0) {
        listaDiv.innerHTML = '<p style="text-align: center; color: var(--cinza-meio);">Nenhuma criança cadastrada ainda.</p>';
        return;
    }
    
    listaDiv.innerHTML = criancas.map(c => `
        <div style="background: var(--cinza-claro); padding: 1rem; margin-bottom: 1rem; border-radius: 6px; border-left: 4px solid var(--azul-principal);">
            <h4>${c.nome}</h4>
            <p><strong>Mãe:</strong> ${c.mae}</p>
            <p><strong>Data de Nascimento:</strong> ${c.dataNasc}</p>
            <p><strong>Microárea:</strong> ${c.microarea || 'Não informado'}</p>
            <p><strong>Peso:</strong> ${c.peso || 'Não informado'} kg</p>
            <p><strong>Cadastro:</strong> ${c.data_cadastro}</p>
            <button onclick="deletarCrianca(${c.id})" class="btn btn-secondary" style="margin-top: 0.5rem; background-color: #f8d7da; color: #721c24;">Deletar</button>
        </div>
    `).join('');
}

function deletarCrianca(id) {
    if (confirm('Tem certeza que deseja deletar este registro?')) {
        const criancas = carregarDados(STORAGE_KEYS.criancas);
        const filtradas = criancas.filter(c => c.id !== id);
        salvarDados(STORAGE_KEYS.criancas, filtradas);
        carregarListaCriancas();
        atualizarDashboard();
    }
}

// ===== HIPERTENSOS =====
const formHipertenso = document.getElementById('formHipertenso');
if (formHipertenso) {
    formHipertenso.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const hipertenso = {
            id: Date.now(),
            nome: document.getElementById('nomeHipertenso').value,
            idade: document.getElementById('idadeHipertenso').value,
            endereco: document.getElementById('enderecoHipertenso').value,
            telefone: document.getElementById('telefoneHipertenso').value,
            pa: document.getElementById('paHipertenso').value,
            peso: document.getElementById('pesoHipertenso').value,
            altura: document.getElementById('alturaHipertenso').value,
            glicemia: document.getElementById('glicemiaHipertenso').value,
            data_cadastro: new Date().toLocaleDateString('pt-BR')
        };
        
        const hipertensos = carregarDados(STORAGE_KEYS.hipertensos);
        hipertensos.push(hipertenso);
        
        if (salvarDados(STORAGE_KEYS.hipertensos, hipertensos)) {
            formHipertenso.reset();
            carregarListaHipertensos();
            atualizarDashboard();
        }
    });
}

function carregarListaHipertensos() {
    const listaDiv = document.getElementById('listaHipertensos');
    if (!listaDiv) return;
    
    const hipertensos = carregarDados(STORAGE_KEYS.hipertensos);
    
    if (hipertensos.length === 0) {
        listaDiv.innerHTML = '<p style="text-align: center; color: var(--cinza-meio);">Nenhum hipertenso cadastrado ainda.</p>';
        return;
    }
    
    listaDiv.innerHTML = hipertensos.map(h => `
        <div style="background: var(--cinza-claro); padding: 1rem; margin-bottom: 1rem; border-radius: 6px; border-left: 4px solid var(--azul-principal);">
            <h4>${h.nome}</h4>
            <p><strong>Idade:</strong> ${h.idade} anos</p>
            <p><strong>PA:</strong> ${h.pa}</p>
            <p><strong>Glicemia:</strong> ${h.glicemia || 'Não informado'} mg/dL</p>
            <p><strong>Cadastro:</strong> ${h.data_cadastro}</p>
            <button onclick="deletarHipertenso(${h.id})" class="btn btn-secondary" style="margin-top: 0.5rem; background-color: #f8d7da; color: #721c24;">Deletar</button>
        </div>
    `).join('');
}

function deletarHipertenso(id) {
    if (confirm('Tem certeza que deseja deletar este registro?')) {
        const hipertensos = carregarDados(STORAGE_KEYS.hipertensos);
        const filtradas = hipertensos.filter(h => h.id !== id);
        salvarDados(STORAGE_KEYS.hipertensos, filtradas);
        carregarListaHipertensos();
        atualizarDashboard();
    }
}

// ===== DIABÉTICOS =====
const formDiabetico = document.getElementById('formDiabetico');
if (formDiabetico) {
    formDiabetico.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const diabetico = {
            id: Date.now(),
            nome: document.getElementById('nomeDiabetico').value,
            idade: document.getElementById('idadeDiabetico').value,
            endereco: document.getElementById('enderecoDiabetico').value,
            telefone: document.getElementById('telefoneDiabetico').value,
            glicemia: document.getElementById('glicemiaDiabetico').value,
            peso: document.getElementById('pesoDiabetico').value,
            altura: document.getElementById('alturaDiabetico').value,
            pa: document.getElementById('paDiabetico').value,
            data_cadastro: new Date().toLocaleDateString('pt-BR')
        };
        
        const diabeticos = carregarDados(STORAGE_KEYS.diabeticos);
        diabeticos.push(diabetico);
        
        if (salvarDados(STORAGE_KEYS.diabeticos, diabeticos)) {
            formDiabetico.reset();
            carregarListaDiabeticos();
            atualizarDashboard();
        }
    });
}

function carregarListaDiabeticos() {
    const listaDiv = document.getElementById('listaDiabeticos');
    if (!listaDiv) return;
    
    const diabeticos = carregarDados(STORAGE_KEYS.diabeticos);
    
    if (diabeticos.length === 0) {
        listaDiv.innerHTML = '<p style="text-align: center; color: var(--cinza-meio);">Nenhum diabético cadastrado ainda.</p>';
        return;
    }
    
    listaDiv.innerHTML = diabeticos.map(d => `
        <div style="background: var(--cinza-claro); padding: 1rem; margin-bottom: 1rem; border-radius: 6px; border-left: 4px solid var(--azul-principal);">
            <h4>${d.nome}</h4>
            <p><strong>Idade:</strong> ${d.idade} anos</p>
            <p><strong>Glicemia:</strong> ${d.glicemia} mg/dL</p>
            <p><strong>PA:</strong> ${d.pa || 'Não informado'}</p>
            <p><strong>Cadastro:</strong> ${d.data_cadastro}</p>
            <button onclick="deletarDiabetico(${d.id})" class="btn btn-secondary" style="margin-top: 0.5rem; background-color: #f8d7da; color: #721c24;">Deletar</button>
        </div>
    `).join('');
}

function deletarDiabetico(id) {
    if (confirm('Tem certeza que deseja deletar este registro?')) {
        const diabeticos = carregarDados(STORAGE_KEYS.diabeticos);
        const filtradas = diabeticos.filter(d => d.id !== id);
        salvarDados(STORAGE_KEYS.diabeticos, filtradas);
        carregarListaDiabeticos();
        atualizarDashboard();
    }
}

// ===== IDOSOS =====
const formIdoso = document.getElementById('formIdoso');
if (formIdoso) {
    formIdoso.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const idoso = {
            id: Date.now(),
            nome: document.getElementById('nomeIdoso').value,
            dataNasc: document.getElementById('dataNascIdoso').value,
            endereco: document.getElementById('enderecoIdoso').value,
            telefone: document.getElementById('telefoneIdoso').value,
            peso: document.getElementById('pesoIdoso').value,
            altura: document.getElementById('alturaIdoso').value,
            pa: document.getElementById('paIdoso').value,
            glicemia: document.getElementById('glicemiaIdoso').value,
            data_cadastro: new Date().toLocaleDateString('pt-BR')
        };
        
        const idosos = carregarDados(STORAGE_KEYS.idosos);
        idosos.push(idoso);
        
        if (salvarDados(STORAGE_KEYS.idosos, idosos)) {
            formIdoso.reset();
            carregarListaIdosos();
            atualizarDashboard();
        }
    });
}

function carregarListaIdosos() {
    const listaDiv = document.getElementById('listaIdosos');
    if (!listaDiv) return;
    
    const idosos = carregarDados(STORAGE_KEYS.idosos);
    
    if (idosos.length === 0) {
        listaDiv.innerHTML = '<p style="text-align: center; color: var(--cinza-meio);">Nenhum idoso cadastrado ainda.</p>';
        return;
    }
    
    listaDiv.innerHTML = idosos.map(i => `
        <div style="background: var(--cinza-claro); padding: 1rem; margin-bottom: 1rem; border-radius: 6px; border-left: 4px solid var(--azul-principal);">
            <h4>${i.nome}</h4>
            <p><strong>Data de Nascimento:</strong> ${i.dataNasc}</p>
            <p><strong>PA:</strong> ${i.pa || 'Não informado'}</p>
            <p><strong>Glicemia:</strong> ${i.glicemia || 'Não informado'} mg/dL</p>
            <p><strong>Cadastro:</strong> ${i.data_cadastro}</p>
            <button onclick="deletarIdoso(${i.id})" class="btn btn-secondary" style="margin-top: 0.5rem; background-color: #f8d7da; color: #721c24;">Deletar</button>
        </div>
    `).join('');
}

function deletarIdoso(id) {
    if (confirm('Tem certeza que deseja deletar este registro?')) {
        const idosos = carregarDados(STORAGE_KEYS.idosos);
        const filtradas = idosos.filter(i => i.id !== id);
        salvarDados(STORAGE_KEYS.idosos, filtradas);
        carregarListaIdosos();
        atualizarDashboard();
    }
}

// ===== DASHBOARD =====
function atualizarDashboard() {
    const gestantes = carregarDados(STORAGE_KEYS.gestantes).length;
    const criancas = carregarDados(STORAGE_KEYS.criancas).length;
    const hipertensos = carregarDados(STORAGE_KEYS.hipertensos).length;
    const diabeticos = carregarDados(STORAGE_KEYS.diabeticos).length;
    const idosos = carregarDados(STORAGE_KEYS.idosos).length;
    
    // Atualizar na página inicial
    const totalGest = document.getElementById('count-gestantes');
    const totalCri = document.getElementById('count-criancas');
    const totalHip = document.getElementById('count-hipertensos');
    const totalDia = document.getElementById('count-diabeticos');
    const totalIdo = document.getElementById('count-idosos');
    
    if (totalGest) totalGest.textContent = gestantes;
    if (totalCri) totalCri.textContent = criancas;
    if (totalHip) totalHip.textContent = hipertensos;
    if (totalDia) totalDia.textContent = diabeticos;
    if (totalIdo) totalIdo.textContent = idosos;
    
    // Atualizar na página de relatórios
    const relGest = document.getElementById('total-gestantes');
    const relCri = document.getElementById('total-criancas');
    const relHip = document.getElementById('total-hipertensos');
    const relDia = document.getElementById('total-diabeticos');
    const relIdo = document.getElementById('total-idosos');
    
    if (relGest) relGest.textContent = gestantes;
    if (relCri) relCri.textContent = criancas;
    if (relHip) relHip.textContent = hipertensos;
    if (relDia) relDia.textContent = diabeticos;
    if (relIdo) relIdo.textContent = idosos;
}

// ===== PESQUISA =====
const formPesquisa = document.getElementById('formPesquisa');
if (formPesquisa) {
    formPesquisa.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const busca = document.getElementById('busca-nome').value.toLowerCase();
        const tipo = document.getElementById('tipo-paciente').value;
        const resultadosDiv = document.getElementById('resultadosPesquisa');
        
        let resultados = [];
        
        if (!tipo || tipo === 'gestante') {
            const gestantes = carregarDados(STORAGE_KEYS.gestantes);
            resultados = resultados.concat(
                gestantes.filter(g => g.nome.toLowerCase().includes(busca)).map(g => ({
                    tipo: 'Gestante',
                    nome: g.nome,
                    detalhes: `Idade: ${g.idade} | PA: ${g.pa || 'N/I'} | Cadastro: ${g.data_cadastro}`
                }))
            );
        }
        
        if (!tipo || tipo === 'crianca') {
            const criancas = carregarDados(STORAGE_KEYS.criancas);
            resultados = resultados.concat(
                criancas.filter(c => c.nome.toLowerCase().includes(busca)).map(c => ({
                    tipo: 'Criança',
                    nome: c.nome,
                    detalhes: `Mãe: ${c.mae} | Nasc: ${c.dataNasc} | Cadastro: ${c.data_cadastro}`
                }))
            );
        }
        
        if (!tipo || tipo === 'hipertenso') {
            const hipertensos = carregarDados(STORAGE_KEYS.hipertensos);
            resultados = resultados.concat(
                hipertensos.filter(h => h.nome.toLowerCase().includes(busca)).map(h => ({
                    tipo: 'Hipertenso',
                    nome: h.nome,
                    detalhes: `Idade: ${h.idade} | PA: ${h.pa} | Cadastro: ${h.data_cadastro}`
                }))
            );
        }
        
        if (!tipo || tipo === 'diabetico') {
            const diabeticos = carregarDados(STORAGE_KEYS.diabeticos);
            resultados = resultados.concat(
                diabeticos.filter(d => d.nome.toLowerCase().includes(busca)).map(d => ({
                    tipo: 'Diabético',
                    nome: d.nome,
                    detalhes: `Idade: ${d.idade} | Glicemia: ${d.glicemia} | Cadastro: ${d.data_cadastro}`
                }))
            );
        }
        
        if (!tipo || tipo === 'idoso') {
            const idosos = carregarDados(STORAGE_KEYS.idosos);
            resultados = resultados.concat(
                idosos.filter(i => i.nome.toLowerCase().includes(busca)).map(i => ({
                    tipo: 'Idoso',
                    nome: i.nome,
                    detalhes: `Nasc: ${i.dataNasc} | PA: ${i.pa || 'N/I'} | Cadastro: ${i.data_cadastro}`
                }))
            );
        }
        
        if (resultados.length === 0) {
            resultadosDiv.innerHTML = '<p style="text-align: center; color: var(--cinza-meio);">Nenhum resultado encontrado.</p>';
            return;
        }
        
        resultadosDiv.innerHTML = resultados.map(r => `
            <div style="background: var(--cinza-claro); padding: 1rem; margin-bottom: 1rem; border-radius: 6px; border-left: 4px solid var(--azul-principal);">
                <span style="display: inline-block; background-color: var(--azul-principal); color: white; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.85rem; font-weight: bold; margin-bottom: 0.5rem;">${r.tipo}</span>
                <h4>${r.nome}</h4>
                <p>${r.detalhes}</p>
            </div>
        `).join('');
    });
}

// ===== BACKUP E RESTORE =====
const btnBackup = document.getElementById('btn-backup');
if (btnBackup) {
    btnBackup.addEventListener('click', function() {
        const dados = {
            gestantes: carregarDados(STORAGE_KEYS.gestantes),
            criancas: carregarDados(STORAGE_KEYS.criancas),
            hipertensos: carregarDados(STORAGE_KEYS.hipertensos),
            diabeticos: carregarDados(STORAGE_KEYS.diabeticos),
            idosos: carregarDados(STORAGE_KEYS.idosos),
            data_backup: new Date().toLocaleString('pt-BR')
        };
        
        const dataStr = JSON.stringify(dados, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `caderneta_backup_${new Date().getTime()}.json`;
        link.click();
        
        mostrarAlerta('Backup realizado com sucesso!', 'success');
    });
}

const fileBackup = document.getElementById('file-backup');
if (fileBackup) {
    fileBackup.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(evento) {
            try {
                const dados = JSON.parse(evento.target.result);
                salvarDados(STORAGE_KEYS.gestantes, dados.gestantes || []);
                salvarDados(STORAGE_KEYS.criancas, dados.criancas || []);
                salvarDados(STORAGE_KEYS.hipertensos, dados.hipertensos || []);
                salvarDados(STORAGE_KEYS.diabeticos, dados.diabeticos || []);
                salvarDados(STORAGE_KEYS.idosos, dados.idosos || []);
                mostrarAlerta('Backup restaurado com sucesso!', 'success');
                atualizarDashboard();
                window.location.reload();
            } catch (erro) {
                mostrarAlerta('Erro ao restaurar backup!', 'error');
            }
        };
        reader.readAsText(file);
    });
}

const btnLimpar = document.getElementById('btn-limpar');
if (btnLimpar) {
    btnLimpar.addEventListener('click', function() {
        if (confirm('⚠️ Tem CERTEZA que deseja deletar TODOS os dados? Esta ação não pode ser desfeita!')) {
            if (confirm('Digite SIM para confirmar a exclusão permanente de todos os dados')) {
                localStorage.removeItem(STORAGE_KEYS.gestantes);
                localStorage.removeItem(STORAGE_KEYS.criancas);
                localStorage.removeItem(STORAGE_KEYS.hipertensos);
                localStorage.removeItem(STORAGE_KEYS.diabeticos);
                localStorage.removeItem(STORAGE_KEYS.idosos);
                mostrarAlerta('Todos os dados foram deletados!', 'warning');
                setTimeout(() => window.location.reload(), 1000);
            }
        }
    });
}

function gerarResumoRelatorio() {
    const gestantes = carregarDados(STORAGE_KEYS.gestantes);
    const criancas = carregarDados(STORAGE_KEYS.criancas);
    const hipertensos = carregarDados(STORAGE_KEYS.hipertensos);
    const diabeticos = carregarDados(STORAGE_KEYS.diabeticos);
    const idosos = carregarDados(STORAGE_KEYS.idosos);

    return {
        gestantes,
        criancas,
        hipertensos,
        diabeticos,
        idosos,
        total: gestantes.length + criancas.length + hipertensos.length + diabeticos.length + idosos.length
    };
}

function renderizarRelatorioDetalhado() {
    const resumo = gerarResumoRelatorio();
    const relatorioDiv = document.getElementById('relatorioDetalhado');
    if (!relatorioDiv) return;

    const totalVisitas = resumo.gestantes.length + resumo.criancas.length + resumo.hipertensos.length + resumo.diabeticos.length + resumo.idosos.length;
    const semVisita = 0; // não há histórico de visitas nos dados atuais
    const vacinasPendentes = 0; // atualmente não há lógica de vacinas pendentes

    relatorioDiv.innerHTML = `
        <div class="grid-250">
            <div class="stat-card">
                <h4>Gestantes cadastradas</h4>
                <p class="stat-number">${resumo.gestantes.length}</p>
            </div>
            <div class="stat-card">
                <h4>Crianças cadastradas</h4>
                <p class="stat-number">${resumo.criancas.length}</p>
            </div>
            <div class="stat-card">
                <h4>Hipertensos cadastrados</h4>
                <p class="stat-number">${resumo.hipertensos.length}</p>
            </div>
            <div class="stat-card">
                <h4>Diabéticos cadastrados</h4>
                <p class="stat-number">${resumo.diabeticos.length}</p>
            </div>
            <div class="stat-card">
                <h4>Idosos cadastrados</h4>
                <p class="stat-number">${resumo.idosos.length}</p>
            </div>
        </div>
        <section class="margin-top-2rem">
            <h4>Resumo rápido</h4>
            <p>Total de registros: <strong>${resumo.total}</strong></p>
            <p>Total de visitas (estimado): <strong>${totalVisitas}</strong></p>
            <p>Pacientes sem visita: <strong>${semVisita}</strong></p>
            <p>Vacinas pendentes: <strong>${vacinasPendentes}</strong></p>
        </section>
    `;
}

function exportarRelatorioExcel() {
    const resumo = gerarResumoRelatorio();
    const rows = [
        ['Módulo', 'Total de Registros'],
        ['Gestantes', resumo.gestantes.length],
        ['Crianças', resumo.criancas.length],
        ['Hipertensos', resumo.hipertensos.length],
        ['Diabéticos', resumo.diabeticos.length],
        ['Idosos', resumo.idosos.length]
    ];

    const csvContent = rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `caderneta_relatorio_${new Date().getTime()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    mostrarAlerta('Exportação para Excel iniciada. Abra o arquivo .csv no Excel.', 'success');
}

function exportarRelatorioPDF() {
    mostrarAlerta('Use o diálogo de impressão do navegador para salvar como PDF.', 'info');
    window.print();
}

const btnExportarPDF = document.getElementById('btn-exportar-pdf');
if (btnExportarPDF) {
    btnExportarPDF.addEventListener('click', function() {
        exportarRelatorioPDF();
    });
}

const btnExportarExcel = document.getElementById('btn-exportar-excel');
if (btnExportarExcel) {
    btnExportarExcel.addEventListener('click', function() {
        exportarRelatorioExcel();
    });
}

const btnImprimir = document.getElementById('btn-imprimir');
if (btnImprimir) {
    btnImprimir.addEventListener('click', function() {
        window.print();
    });
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    atualizarDashboard();
    carregarListaGestantes();
    carregarListaCriancas();
    carregarListaHipertensos();
    carregarListaDiabeticos();
    carregarListaIdosos();
    renderizarRelatorioDetalhado();
});
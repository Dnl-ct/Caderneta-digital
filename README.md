# 🏥 Caderneta Digital ACS

Sistema web completo para acompanhamento digital de pacientes pela Atenção Primária à Saúde.

## 📋 Descrição

A **Caderneta Digital ACS** é uma aplicação web moderna e responsiva desenvolvida para facilitar o trabalho dos Agentes Comunitários de Saúde (ACS) no acompanhamento de pacientes. Substitui as tradicionais fichas de papel em um único sistema integrado e profissional.

## ✨ Características

### 🎯 Módulos Principais
- **👶 Crianças** - Acompanhamento de crescimento, desenvolvimento e vacinação
- **🤰 Gestantes** - Monitoramento pré-natal com DUM, DPP e controle de saúde
- **❤️ Hipertensos** - Controle de pressão arterial e acompanhamento
- **🩸 Diabéticos** - Monitoramento de glicemia e controle metabólico
- **👵 Idosos** - Acompanhamento integral com múltiplos profissionais

### 📊 Funcionalidades
- ✅ Cadastro de pacientes com dados completos
- ✅ Histórico de visitas e consultas
- ✅ Vacinação e acompanhamentos profissionais
- ✅ Pesquisa rápida por nome
- ✅ Relatórios estatísticos
- ✅ Backup e restore automático
- ✅ Funciona offline (dados armazenados localmente)
- ✅ Design responsivo (funciona em desktop e mobile)

## 🎨 Design

**Cores:**
- Azul Principal: `#0066cc`
- Branco: `#ffffff`
- Preto: `#000000`
- Cinza: `#f5f5f5` a `#333333`

**Design:** Moderno, limpo e profissional com ícones intuitivos

## 📁 Estrutura de Arquivos

```
Projeto-Agenda-eletronica/
├── index.html           # Página inicial e dashboard
├── gestantes.html       # Módulo de gestantes
├── criancas.html        # Módulo de crianças
├── hipertensos.html     # Módulo de hipertensos
├── diabeticos.html      # Módulo de diabéticos
├── idosos.html          # Módulo de idosos
├── relatorios.html      # Relatórios estatísticos
├── pesquisa.html        # Pesquisa de pacientes
├── configuracoes.html   # Configurações e preferências
├── style.css            # Estilos CSS (responsivo)
├── script.js            # Funcionalidades JavaScript
└── README.md            # Este arquivo
```

## 🚀 Como Usar

### Acesso
1. Abra o arquivo `index.html` no seu navegador
2. Ou hospede os arquivos em um servidor web

### Navegação
- Use o menu superior para navegar entre os módulos
- Cada seção tem seu próprio formulário de cadastro
- Os dados são salvos automaticamente no navegador

### Cadastro de Pacientes
1. Acesse o módulo desejado (ex: Gestantes)
2. Preencha o formulário com os dados do paciente
3. Clique em "Salvar"
4. O paciente aparecerá na listagem abaixo

### Pesquisa
1. Acesse "Pesquisa" no menu
2. Digite o nome do paciente
3. Selecione o tipo (opcional)
4. Clique em "Pesquisar"

### Relatórios
1. Acesse "Relatórios"
2. Visualize o dashboard com estatísticas
3. Exporte em PDF, Excel ou imprima
   - PDF: o navegador abrirá o diálogo de impressão para salvar como PDF
   - Excel: baixa um arquivo CSV que pode ser aberto no Excel

### Backup de Dados
1. Acesse "Configurações"
2. Na seção "Gerenciamento de Dados"
3. Clique em "Fazer Backup" para baixar
4. Clique em "Restaurar" para importar

## 💾 Armazenamento de Dados

Os dados são armazenados no **LocalStorage** do navegador, o que significa:
- ✅ Funciona completamente offline
- ✅ Dados persistem entre sessões
- ✅ Sem necessidade de servidor externo
- ⚠️ Dados são perdidos se cache for limpo
- 💡 Sempre faça backup regularmente

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- 🖥️ Desktops
- 💻 Tablets
- 📱 Smartphones

## 🔒 Privacidade e Segurança

- Todos os dados ficam locais no dispositivo
- Sem envio de dados para servidores externos
- Faça backup regularmente para segurança

## 🛠️ Requisitos

- Navegador moderno com suporte a:
  - HTML5
  - CSS3
  - JavaScript ES6+
  - LocalStorage API

## 📝 Dados Coletados por Módulo

### Gestantes
- Nome, idade, DUM, DPP
- Peso, altura, PA, glicemia
- Profissionais responsáveis (ACS, Enfermeira, Técnica)
- Vacinações
- Observações

### Crianças
- Nome, data de nascimento, nome da mãe
- Microárea
- Peso, altura
- Vacinações (BCG, Hepatite B, Pentavalente, VIP, etc.)
- Acompanhamentos profissionais
- Histórico de consultas

### Hipertensos
- Nome, idade, endereço, telefone
- Peso, altura, PA, glicemia
- Acompanhamentos
- Vacinações
- Observações

### Diabéticos
- Nome, idade, endereço, telefone
- Peso, altura, PA, glicemia
- Vacinações
- Observações

### Idosos
- Nome, data de nascimento, endereço, telefone
- Peso, altura, PA, glicemia
- Vacinações
- Acompanhamentos profissionais

## 🆘 Suporte

Para problemas ou sugestões:
1. Verifique se o navegador é compatível
2. Limpe o cache e tente novamente
3. Faça backup dos dados regularmente
4. Teste em outro navegador

## 📄 Licença

Desenvolvido para uso em Atenção Primária à Saúde - 2026

---

### Créditos

👨‍💻 Desenvolvedor: Danilo

🤖 Assistência de IA:
Utilizada para apoio no desenvolvimento, design da interface e estética visual do sistema.

---

❤️ Desenvolvido para contribuir com a melhoria da saúde comunitária.# Caderneta-digital-ACS
# meu
# Caderneta-digital

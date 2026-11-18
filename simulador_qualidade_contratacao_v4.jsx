import { useState, useEffect, useRef } from "react";
import mammoth from "mammoth";
import {
  ClipboardList, Upload, BarChart3, ClipboardCheck, Plus, X, FileText,
  ArrowRight, ArrowLeft, CheckCircle2, Circle, MinusCircle, XCircle, Sparkles, Info, Trophy,
  TrendingUp, TrendingDown, Minus, Loader2, AlertTriangle, Pencil, Bot,
  Lightbulb, GraduationCap, Briefcase, Scale, FileSearch, Target
} from "lucide-react";

// ---------- Marca Avla ----------
const AVLA_BLUE = "#0071CE";
const SKY_BLUE = "#9FD7E5";
const SUN_YELLOW = "#FDDA00";
const EMERALD = "#00CE7E";
const BEIGE = "#F4F3EC";
const BORDER = "#E0DBD7";
const MUTED = "#706C63";
const RED_TXT = "#B42318";
const RED_BG = "#FDE8E8";
const RED_BAR = "#E57373";

// Logo oficial Avla (versão branca, para uso sobre o fundo Avla Blue). Não distorcer: definir só a altura.
const LOGO_AVLA_BRANCA = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASoAAAB2CAYAAAB/Ad4XAAAUiUlEQVR42u2deZBV1Z3HP91NL7ZEAY0rioIRg8jigopBQaRZbKRRBLVqpiZjZjQ6ycSpSUhMMpUZdeJkKi6ZpGZSsWISE1CWBlQWRTFiAghxG3dHRQIiEcRWZGmg+80fv/PKtnlN3/ve+d137nu/T1VXsbw+7y7nfu/5nfM7319FJpPBMAwjZCrtEhiGYUJlGOFSEVg7Rhf0KIFzOBc4GdhXJKHfAzwO7LLulBrqgduALwBtHtqrAlYAd9ilVXqjpHyOqg/wB+CLRTyGDDANaLbulBoOB9Y5ofJFM3CFXVoL/XIxqsgilR32WwdNFxngE89t7rbLakLVFTMCOY6JwInWnQzDhKozJwCXBHIsvYHLrDsZhglVZxqBzwd0PJdTGosThmFC5fG4Q5sXugAYYl3KMEyospwBfCmwY6oBplqXMgwTqizTgNoAj6sJOMS6lWGYUPUEJgd6bIOA0datDMOE6lxgaMDX83LrVoZhQnV14Md3KWGtRhqGCVXCHAuMT8ExTrauZRjlK1Rjgb4pOM6p2I56wyhboZqekuMcA5xq3cswyk+oBpKeFbVDsUl1wyhLoZoCfC5FxzuVMHO9DMOESola0pf1PQwYYV3MMMpHqM5K4UNfbeGfYZSXUE0nnTlfTYibpGEYJS5UfYBJSm2vBP4Z2KDUfj+gwbqZYZS+UF2EX2/rjtwF/Bi4X6l9syk2jDIRKi274Y3Ak+7PS/BTjSQX4zGbYsMoaaHqh2Sja/AYsN39+TngVaXv6YXMVRmGUaJCdSlwpFLbCzv8eQfwhOJ5NCGrgIZhlJhQadoNvwWs6vRvixTP5XzMptgwSlKozkB8yDV4EtjW6d/WAm8qfV8dllNlGCUpVFeitwVlQY5/2wEsUzyfKcgeQMNIkhpk61lv4Agk3acXKbPMDrW8U0/06uStB/7Yxf89CtygJOCnIakWSyJ8tsqNwtqRqr6+X057gf2B3fNDFM61wp3vbnctS5UKZC63P2KHPRA43gnSYe4FWeOuRcbd+13AR8iC0p+BF4Hn3Z93mlBF43wX+mmwDPiwi/9b6W7USQrfW+XCvyhCVQv83Ilbu8I93wB8BfggkPt9HfD3+E8RqQTeBr4c4sPnYTrhAvdzLnC2GzUVsmizB3gdWIEsLj1GtFL1RyKJzbUe+mslsBzYlAahukqp3Uw3QvGRu0h/p/T92aKpW7v53C4npmcpHcdw4BcRRTOJl+XfAmcqtb/WXc9SYQSyijwFSYT2uZpch9QjGArcBLwE/BaY7V7gXTEE+J3naZJNndUrNI5Bb9vJeuD33XxG8+E9OkZI+0ugVfFYQrFLHg4MVmq7FfiVQkiZNDVuNL4UeAr4jgvxtFNeBgO3u0hjJl3Psfb2/L3tuYZZoTEOPbvhxcAn3XxmFfCO4vlNjXjdn3cdRIsGN39RbC4B6pXaXu1GVGlmspuumA9McKKVNP2cYK0gt3mlb6HKpEGotLbMtDmh6o736Xqy3QdRbYoz6O1BBJmHG13ke12B3qIJnsORpBnk7v8i12dCCTsXA1/v9O99tL84NKEaiKyMafCme8NGQTP5s57oiayLO8fqnu99sSv6DHOhnwbvEsYcXD7c6EbTMwivSEg9cDdwa4d/OyJNQnW4ewsUQhOSmqDBcuDjiJ99CtiieN2bkInL7vgL8JDicUwscvjXiF6u3BJgc8oEqg/wa+CnSTz8BfJdZN4qdSOqO5AlzQl5/n4NunbDC2J8douLx7UYCpwT8bOz0ct5OhkYVaSOXl1AX+mOdmS1Kk2c5kbQf52iY/4399JVrw3gS6hmIkvMRwFzgWvyaOMc9OyGXwb+FPN3HlF+SK+M+Nm1wDrFY5lSpE4+WPF+ryVdk+jnuJHzeSkT1xrgJyRgE+5DqGZ0ild7IkvC34zZznTFePyxGGFfx9/ZrnjtLyPaakmrE38tLk5i6N7F+Wvl8c1FkhfTwNnIit4ppJMTkLnloIVqJPDfOTpcNfAj4GdEW3rug8yXaJDhs5YuUdmsHP71Q1IxotBM19n0hTKgCG/yWvQm8luAeSl5yAcCD7iH3VASqv7Afd2MCm5A5oa6e1uMRs9u+BXg6Tx/d6ny9Y/qqLABeFjxOJqKEPYNU2r7IQ6eRR0KvZF5tP4mQ3pC1Rv4TcSL3ODCqMu7CR+1WEy0/Uq5eEI5/JvoRlZRw5lSCf/Go7N7PwPMSclz91MX9hlKQlXlwr04XlH9kOS1/+DAascnuQdFg30FjorWA2sUr/9hMUYzy5FFAQ1OdmF8ElQpjuBedi/F0LmO/BacTKhicFueI6Bq4FuIlUrHpM5G9OyGXyF6kmdXzFe+B01E2xaxB71M9UrE9jkJzkTPGeMBwp9EH8hnF58MBaH6Kp8meeXLeU6sbgOORXd5fD6Fb+xdjm7y58gYD+4CxOBPg0kkUyx1PNGSXeOyA1l0CJ3bKM4qa9kI1STgTk/fWwPcjGwT0Eo4/AR40EM7G9Fd/asBpsUYIT6pdBwnor+nrNqNoDV4Ar1KQr5oxOo85kXUPJYhiO2I7wxUzdyRNYifjg/mKM8pTAF+SPe5XhlkpUjrYZ9AfqkcxOhHWh5bvyNsO5c6D9FIPuxGzANfcEK+xYXHGTdQqUfcQAe7kX0/AqyYFEWojgFmIV5KaWIe/hwjn0A2NWsJ62luZBnF3WE5UkVngMJxNLiwRGulsxGdJM830fW79/US+FKC3/c0srl+KeLaGWXl+1D3IpmEbGc7NZSL113oV49skjw9ZSK1NeJDH5WPPYWRXRGn9Pt29NwdNFf/6tAzRJxP/J0HSVIFXJ/Qd61BFrvGulH680RPz9mJTMd824nqN9D1ZvMmVHcrdi5NluHfHmUhku6gxaQYo9b7kQINGjQptTuY6Bux47AH3RwzH5yFvvfXTsT5c6ybqijUI36re/4vBO4NWahuRgoApJGFCm2ucnG+FkcT3R74GfTM/UYjvu4aYZ/G3Mcf3PUImanoOgy84V50t+PfH34jYjjwT4ovx7yF6hrSm+vxFjKP45u2BN7cUW2K29HLqRqgEP7VuAdJg9BdPGvRdTF9EVmMWal8HnciRU+KkqeW66EYg7gfVJBO5qCXa7QYqVSjxRii70R/GHhP6Th8F34Yjk6S5ybCn0Q/D719rBvdoOK1hM7lN0jSdhBC9QmyCTaNtKLrI+Uj0/1gHEL0SfXN+F0w6Mgl+DXsb0AnyfMhdJNxfXChUsi7D9n0/1LC5/NfSKpS0YVqHbKdIo3VO3oAPwBucQ/8SZ7bzyQQ/jURfcPuLPwX7QRJ/hztqa0qpdBnfwrCvkr0TOV+jq6jxsH4NpISUlShApmca0R3SV6DKveAfQ/Jo1oDPIsU27wRmSc5g8L8qOcrjziHx+jc2fPzTQX+/MHORhI9fbMGXedTH/RCp3jFu8hWnGKxNenv79HNwVyNGODdmNJQ8Gj307GztLiwaRtS0nyTu/FbEXO6D5HVjb1ueN3mBL26wxD+HaLbs+Tz8riSaFtldjtB1lj2H+8etJYC25mETi26uRRxFSoipwDHKbT7iwBC3tnAP6LnKxZZqECWOv8BWUn7IQmYuCf0lusV8bPtfLoto6pTCKhJI/B9orl6zkMqgviuJpPd+7eggDZq0SngsL3A40qK0/G/KPVRICFvK3AP4qtVtNCvM3cixnfrKS8qnUBV5QiNNOlH9ETbt9GrX1fonsIz0Nnb9yCy4hU6GluuVpLw/NBBeNhFJcEIFe5hGIfeSpPxWeLsstdytRxLYV5hU3KIfKGkxcUTdLzQQ0rH2IBuVfG8hAoXAk4D/hXd7SSGjKhOjvjZR5GNpxoju3yTP7X29r2Iru2OT3xn+O9D9u6FxJokviQfh889SArAxAAvWilxONFNBXci7pYa5FsUdghSaNU3syncDDEJqjnQdrtQtuB/D2uhPEsC9jqFVKF53IUGd9noSo0motuiNFP4RtRcjM4z/LsU/4svLaRjEh3EMqWn5zbfdz8h8Qb5F09JRKhAVl9ucg/Usxi+GUn05d//RTboaoR/cX2UeuB/Gw6IL9jrKbl3tfivtLOD8Dzht6NbqcmLUGVZgmy7uJWwfYHSRjXRbYqz7p++qchDdEag42H22xTduwqPz1eWEEPefWkSKpCcn+87wVqE4YvLYoQQy9DJmm8g3t6/Bvwneb6OjitGmgjRark9CQGtVGhzHTIBexXhb3FIA6cRfd/dNnS2PfVF5iOjUIOOp3szeq4YaRGWmgDPUWPkmIhQZW/QA0gag1F4R5gW4/OzkQ27vomaYX4m/rdV7CY9uVNZstuwfHIo4RVe6EH0nR7BCVWWJtMZL0xEimxEYS06VjTjibb614j/JM+VpC8VZpfCCPBI9Ir15ksvEij8oilUx6Pn6lhuHEX0Ce02pdFHX7qvwViPTpLnrBTes1b8p4sc556rkDjdjfRSK1SXoLNzvFyZSvQ9hosQNwjfdJeAOsSFfj7ZQPgunrnI4H817BBgUGDnOZIE3IA1heoq0xavjAG+GPGzG9HZqHxRN8P8yQph34OEl+QYlc0KbY4L6PxqiL7IEqRQDSLZYovlQB3xJtVnIUvHPjmJrvf+1eHf0mUfsjiQVt5WaHMs4RQDHoGeg2kiQjUF/9sHDMmpiprt/Ed0ynt1Ff6dhf8kz9WEXwrrYLyq0OaxMV9YmlyPTuXrRISqFvGuMvwzLMYbbCdim+ybi8ntCtCA/719cwjfxfNgvIEUS/HNDfjf8ByX85MUTA2hGoGOWRrI9pwlwJ/LVKiqgOkxPj9X4UE5gQMTUKvxX8BhGzqFZJNkC/CyQruDgK8V8bxqSNjxV0OopqO3CrAambAdjsyH/Agpj7WF8uFSoE+MN7rGilnnwg/nKoR9ixAv+zTTCvxJqe1vktD8UA5uRhZWEsO3UB2Bbu7UAmSCeLsTqJlOsEYik4wzka0WL6CzPB8CcWyKs+GTb8Z3EssJ+M2YbkfPXytptOpA9kJKZiU9sX4N4tGfKL4nwsYA/ZWOdStScDIX693Pig6hyAD3czziXX0qsmr1eSRBrd7zw7UfyUZuQRYS+ijet2lEL+m+DHFmHeDx+49D8uTmuOG/75fTC0SrwpMGnnRhrEZG+TCk0MPVCb2YrwD+h4Qm0DWFSjN3ainR81L2IWWuX8sRW9e7TtPXvY16u7/XOYGp59OiDjWdhGife9vvRuZ+Wl0HaUFyfd5F5s8muIe4SulajENsiqMU29jhjuU7no+h0bU7BP97+2aR7kn0jmwCniJ/p9TuGIvM5V2Lbmn3G4H/xL/HVuJC1d+NqDTI4GdiNbtRtAXdSh5Lgf9DnA80OMx1/Dsifr4Z+IbnTjYRKe89BL9zktspPZugeYpChZv6WO5eRr49u/oi1uPXFvMC+pyjijPJG5c3kQIGaWE3+itWU4hu+/GswlzJkUjNxws9t7vCiXwp8Sg6yZ+dBeU+ZB73Ik/392tuNHhtsS9gpcd2NHMqFqLjB47yMWvaxp5H9OIJ7aTHHfM+So9tJJdh34TUM3gI+ApSSDbqFEQdsoJ7K2Jr/RNkXrfo+Ar9znQnqMFe0plP8xySVX2BUvs1SOn3qOaES9x8Sd+Ar9mrpKcUVlzuAb6K7iJLlipkDrHRhdIvI/Y/693fdyJzrrVI4uhRyD7S85G5z7rQLp4voboCveSvZ9xFThtZgb1A8Tsaie5T/xeksu31AV+zZnQyuUPgHSdW30r4e/sg9jyj0nzxfIR+PfGfldy58+5P6fVdiK597kDizRHNxv9GZV/sJnrKRVq5m/QnsaZWqEah55GzAx0P8KR4SzmUiTs3uIpwfexXAC+V+PO2GbjFZKc4QqWZO/U4sg0krWTQL5g5EdlRH4X9hJvxfX+ZPHP3kE4jwFQLVTZDWYsFJXCNFwPvKbYfx6Y4G45uD+warUdyz8qBNiSnbTNGYkLVgJ7d8Hsl0nm3ObHSZGqMe7k+wDf6IuCDMnruXge+7kTLSECoNMO+BymdjcXNyp1yNPGy4GcRTjHLvWUU9nVkPvA9kyB9oTodvaX39hIJ+7I85d6iWsS1KV5JOBPXq0i3i2ch3A78uATOY1fIQjUZPbvhVymd3fMguUHaq5dTkA3VUdiBjvtnPjxAetNPfDATuCvFx78CyWAPUqiqkSRPzVBpT4l1yGbEbUGLocQzUpubxJuwG96n9DYgx6UNuIl0VhXfClznIoYghWok/uu3ZWkl/Ra0uXgBeFqx/SpgRsxR62NFviYL0V0RTRM/AL5MeCuyXdEC/BViGLBT+SWct1BdiV4Fm9XoVE8pNnsTGD1MIrpBWwYd9884I4k5GB35lbuHqwM/zncRy/FH3N/fI9o2rkSF6ggO9Mz2HSKV6rLtQnS31JxIvLy2xUgl4mLwHDKpb3yWp51Y/Tth7nv8PZKWtLyTcKkeaz5CdTF6dsMtJT5n8XanG6zBtJjXe16RrsUsxDHVyH1fvuuetXmEsT+zBfgXxHfulU7/txPlAiv5CNUMxeNZRumXwtJOuxgX80UyT3t+IQfbSPcezqRYh0yzNCCLH8XwZNsF/BrJ1buFrhdgVJ/buEI10D0ImqFRqfMIuhPIh7nOHedhSNpGZwWyYbtYVACHe25TszL448ic0EVIPb3X0E/Y3Qz8zH3n39D9vLHPPn1A0ZW4flRjEN8p3xNnPVzHfaQMhGqrG8Vci07+UDVi/XI30VI82oB7kaKxbcoPQKVr/94i34NW9xAe7+l8K9Gr39eRZ9zPrW6EM8rd66FIZaVCyDixWeGEMe4LtdmFqIVezwpyJEdXZDKx2u2NFAhoV+jAu4EPy2RIX4cYmrUriUG7E8S2GL9zTAJzIRUKb99ypw5xzxjiBOsUpLrSMe55/ZwbXNS467/XhZAfuPuw0Y3QVgEvurA8OOIKlWEY6SArUtn6lT2cUO13g4KPkZytVCxomFAZhhE8lXYJDMMwoTIMwzChMgzDhMowDMOEyjAMw4TKMAwTKsMwDBMqwzBMqAzDMEyoDMMwTKgMwyht/h/7ldVuztnYDwAAAABJRU5ErkJggg==";

// ============================================================
// TAXONOMIA
// Competências e comportamentos agora são ABERTOS: pertencem a cada vaga.
// As listas abaixo são apenas SUGESTÕES para o gestor clicar; ele pode escrever as suas.
// ============================================================
const SUGESTOES_COMPETENCIAS = [
  "Experiência com Seguros", "Seguro Garantia / Fianças", "Subscrição de riscos", "Análise de crédito",
  "Gestão de sinistros", "Resseguro", "Regulação (SUSEP)", "Excel Avançado", "SQL", "Power BI / Dados",
  "Python / Automação", "Atuarial", "Inglês Avançado", "Espanhol", "Gestão de Projetos",
  "Apresentações Executivas", "Negociação", "Relacionamento com corretores",
];

const SUGESTOES_COMPORTAMENTOS = [
  { nome: "Raciocínio Analítico", exemplo: "Estrutura problemas complexos e decide com base em dados, não só em intuição." },
  { nome: "Comunicação Clara", exemplo: "Explica temas técnicos de forma simples, por escrito e verbalmente." },
  { nome: "Autonomia (\u201cGet Things Done\u201d)", exemplo: "Toma a iniciativa e entrega sem precisar ser cobrado a cada etapa." },
  { nome: "Resiliência & Flexibilidade", exemplo: "Mantém a qualidade sob pressão e se adapta quando as prioridades mudam." },
  { nome: "Protagonismo & Liderança", exemplo: "Assume responsabilidade pelo resultado e influencia colegas sem depender de cargo." },
  { nome: "Cliente no Centro", exemplo: "Entende a necessidade do cliente antes de propor soluções." },
  { nome: "Trabalho em Equipe", exemplo: "Compartilha informação, pede ajuda e valoriza a entrega coletiva." },
  { nome: "Atenção a Detalhes", exemplo: "Revisa o próprio trabalho e identifica inconsistências antes de entregar." },
  { nome: "Organização e Gestão do Tempo", exemplo: "Prioriza o que importa e cumpre prazos sem sacrificar a qualidade." },
  { nome: "Curiosidade e Aprendizado Rápido", exemplo: "Aprende temas novos com rapidez e busca melhorar processos." },
  { nome: "Negociação e Influência", exemplo: "Chega a acordos bons para as duas partes mantendo o relacionamento." },
  { nome: "Tomada de Decisão", exemplo: "Decide com informação incompleta, assumindo e comunicando os riscos." },
  { nome: "Integridade", exemplo: "Age com transparência e consistência, mesmo quando ninguém está olhando." },
  { nome: "Inovação", exemplo: "Propõe formas novas e mais simples de fazer o que já é feito." },
];

const FORMACAO_NIVEIS = {
  1: "Ensino médio / técnico",
  2: "Graduação",
  3: "Pós-graduação / MBA",
  4: "Mestrado / Doutorado",
};
const FORMACAO_AREAS = [
  "Administração / Negócios", "Economia / Finanças", "Engenharias",
  "Atuária / Matemática / Estatística", "Direito", "Tecnologia / Dados", "Outras",
];
const EXPERIENCIA_OPCOES = [
  { v: 0, label: "Sem exigência" }, { v: 1, label: "1+ ano" }, { v: 2, label: "2+ anos" },
  { v: 3, label: "3+ anos" }, { v: 5, label: "5+ anos" }, { v: 8, label: "8+ anos" }, { v: 10, label: "10+ anos" },
];
const SENIORITY_LABELS = {
  1: "Executa com supervisão constante",
  2: "Executa com supervisão pontual",
  3: "Autônomo em tarefas conhecidas",
  4: "Autônomo e propõe soluções",
  5: "Define estratégia, sem supervisão",
};
const WEIGHT_LABELS = { 1: "Baixa", 2: "Média", 3: "Alta" };

function uid() { return `i-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`; }

function mediaPonderada(itens) {
  const ativos = itens.filter((i) => i.valor !== null && i.valor !== undefined);
  const pesoTotal = ativos.reduce((a, i) => a + i.peso, 0);
  return pesoTotal ? ativos.reduce((a, i) => a + i.valor * i.peso, 0) / pesoTotal : null;
}
const pct = (v) => (v === null ? null : Math.round(v * 100));

// ============================================================
// MOTOR DE PONTUAÇÃO (Fit Score) — regras determinísticas e auditáveis
// Pesos: competências 30% · experiência 20% · formação 10% · senioridade 15% · comportamentos 25%
// Se a vaga não definiu competências ou comportamentos, os pesos são redistribuídos.
// ============================================================
function calcularFitScore(vaga, candidato) {
  const obrig = vaga.competencias.filter((c) => c.nivel === "obrigatoria");
  const desej = vaga.competencias.filter((c) => c.nivel === "desejavel");
  const tem = (c) => !!candidato.competencias?.[c.id];
  const obrigCob = obrig.length ? obrig.filter(tem).length / obrig.length : null;
  const desejCob = desej.length ? desej.filter(tem).length / desej.length : null;
  let competencias = null;
  if (obrigCob !== null && desejCob !== null) competencias = obrigCob * 0.75 + desejCob * 0.25;
  else if (obrigCob !== null) competencias = obrigCob;
  else if (desejCob !== null) competencias = desejCob;

  const experiencia = vaga.experienciaAnos > 0 ? Math.min(1, candidato.experienciaAnos / vaga.experienciaAnos) : 1;

  const nivelScore = Math.min(1, candidato.formacaoNivel / vaga.formacaoNivel);
  const areaScore = (vaga.formacaoAreas.length === 0 || vaga.formacaoAreas.includes(candidato.formacaoArea)) ? 1 : 0.5;
  const formacao = nivelScore * 0.7 + areaScore * 0.3;

  const senioridade = 1 - Math.abs(vaga.senioridade - candidato.senioridade) / 4;

  let comportamentos = null;
  if (vaga.comportamentos.length) {
    const pesoTotal = vaga.comportamentos.reduce((a, b) => a + b.peso, 0);
    comportamentos = vaga.comportamentos.reduce((acc, b) => acc + b.peso * ((candidato.comportamentos?.[b.id] ?? 3) / 5), 0) / pesoTotal;
  }

  const dimsAlinhamento = [
    { valor: competencias, peso: 0.30 }, { valor: experiencia, peso: 0.20 },
    { valor: formacao, peso: 0.10 }, { valor: senioridade, peso: 0.15 },
  ];
  const total = mediaPonderada([...dimsAlinhamento, { valor: comportamentos, peso: 0.25 }]);
  const alinhamento = mediaPonderada(dimsAlinhamento);

  return {
    total: pct(total),
    alinhamento: pct(alinhamento),
    competencias: pct(competencias),
    experiencia: pct(experiencia),
    formacao: pct(formacao),
    senioridade: pct(senioridade),
    comportamentos: pct(comportamentos),
    obrigFaltando: obrig.filter((c) => !tem(c)).map((c) => c.nome),
    expAbaixo: candidato.experienciaAnos < vaga.experienciaAnos,
    formacaoAbaixo: candidato.formacaoNivel < vaga.formacaoNivel,
  };
}

// ============================================================
// RESULTADO REAL (90/180 dias) + PARECER FINAL
// ============================================================
function calcularResultadoReal(vaga, avaliacao, fit) {
  const entregaveisDefinidos = vaga.entregaveis.filter((e) => e.trim() !== "");
  const statusValores = { entregue: 1, parcial: 0.5, nao: 0 };
  const entregaveis = entregaveisDefinidos.length
    ? (entregaveisDefinidos.reduce((acc, _, i) => acc + (statusValores[avaliacao.entregaveisStatus[i]] ?? 0), 0) / entregaveisDefinidos.length) * 100
    : null;

  const competencias = vaga.competencias.length
    ? mediaPonderada(vaga.competencias.map((c) => ({
        valor: ((avaliacao.competenciasReal?.[c.id] ?? 3) / 5) * 100,
        peso: c.nivel === "obrigatoria" ? 2 : 1,
      })))
    : null;

  const diffSenioridade = avaliacao.senioridadeReal - vaga.senioridade;
  const senioridade = (1 - Math.abs(diffSenioridade) / 4) * 100;

  const comportamentos = vaga.comportamentos.length
    ? mediaPonderada(vaga.comportamentos.map((b) => ({
        valor: ((avaliacao.comportamentosReal?.[b.id] ?? 3) / 5) * 100,
        peso: b.peso,
      })))
    : null;

  const comps = [
    { key: "entregaveis", label: "Entregáveis dos 90 dias", valor: entregaveis, peso: 0.35 },
    { key: "competencias", label: "Competências técnicas", valor: competencias, peso: 0.20 },
    { key: "senioridade", label: "Senioridade / autonomia", valor: senioridade, peso: 0.15 },
    { key: "comportamentos", label: "Comportamentos", valor: comportamentos, peso: 0.30 },
  ].map((c) => ({ ...c, valor: c.valor === null ? null : Math.round(c.valor) }));

  const notaReal = Math.round(mediaPonderada(comps));
  return { notaReal, comps, diffSenioridade, gap: notaReal - fit.total };
}

function statusDe(v) { return v >= 75 ? "atende" : v >= 50 ? "parcial" : "nao"; }

function gerarParecer(vaga, candidato, avaliacao, resultado, fit) {
  const val = (key) => resultado.comps.find((c) => c.key === key)?.valor ?? null;
  const E = val("entregaveis"), C = val("competencias"), S = val("senioridade"), B = val("comportamentos");
  const okMin = (v, min) => v === null || v >= min;
  const nota = resultado.notaReal;
  const gap = resultado.gap;

  let veredito = nota >= 75 ? "atende" : nota >= 55 ? "parcial" : "nao";
  if (veredito === "atende" && E !== null && E < 50) veredito = "parcial";

  const recs = [];

  // 1) Entregáveis
  if (E !== null && E < 60) {
    const pessoaCapaz = okMin(B, 70) && S >= 70 && okMin(C, 60);
    if (pessoaCapaz) {
      const evid = [B !== null ? `comportamentos ${B}%` : null, `senioridade ${S}%`].filter(Boolean).join(", ");
      recs.push({
        prioridade: "alta", tipo: "Escopo da vaga", icon: FileSearch,
        titulo: "Revisar o escopo da vaga e os entregáveis dos 90 dias",
        texto: `A pessoa demonstra capacidade (${evid}), mas só ${E}% dos entregáveis foram cumpridos. Isso sugere que os entregáveis ou as atividades descritas estavam ambiciosos demais, mal definidos ou dependentes de fatores fora do controle do cargo. Reveja a descrição das atividades e os entregáveis com o gestor antes da próxima abertura.`,
      });
    } else {
      recs.push({
        prioridade: "alta", tipo: "Onboarding e desenvolvimento", icon: GraduationCap,
        titulo: "Reforçar onboarding e acompanhamento",
        texto: `Apenas ${E}% dos entregáveis foram cumpridos e há lacunas em outras dimensões. Combine metas de curto prazo, 1:1 quinzenal e um plano de desenvolvimento com prazos.`,
      });
    }
  }

  // 2) Senioridade
  if (resultado.diffSenioridade <= -1) {
    recs.push({
      prioridade: resultado.diffSenioridade <= -2 ? "alta" : "média", tipo: "Escopo da vaga", icon: FileSearch,
      titulo: "Autonomia abaixo do nível pedido",
      texto: `Esperava-se nível ${vaga.senioridade} e a pessoa demonstra nível ${avaliacao.senioridadeReal}. Avalie um plano de desenvolvimento e confirme se o nível pedido é realista para a faixa e o mercado — ou se a vaga deveria ser aberta em um nível menor.`,
    });
  }
  if (resultado.diffSenioridade >= 2) {
    recs.push({
      prioridade: "média", tipo: "Escopo da vaga", icon: FileSearch,
      titulo: "A vaga pode estar subdimensionada",
      texto: `A pessoa demonstra nível ${avaliacao.senioridadeReal}, acima do nível ${vaga.senioridade} pedido. Considere ampliar o escopo e planejar a carreira (risco de retenção) e, na próxima abertura, revisar o nível da vaga.`,
    });
  }

  // 3) Competências técnicas
  if (C !== null && C < 65) {
    const baixas = vaga.competencias.filter((c) => (avaliacao.competenciasReal?.[c.id] ?? 3) <= 2).map((c) => c.nome);
    let texto = `Competências técnicas em ${C}%.`;
    if (baixas.length) texto += ` Pontos mais fracos: ${baixas.join(", ")}.`;
    if (fit.obrigFaltando.length) texto += ` Na seleção, já faltavam competências obrigatórias (${fit.obrigFaltando.join(", ")}) — confirme se a contratação foi aprovada mesmo assim e se a obrigatoriedade faz sentido.`;
    texto += " Revise a triagem técnica (testes/cases) e defina um plano de capacitação.";
    recs.push({ prioridade: "alta", tipo: "Processo seletivo", icon: Briefcase, titulo: "Revisar a triagem técnica e o plano de capacitação", texto });
    if (baixas.some((n) => /seguro/i.test(n))) {
      recs.push({
        prioridade: "média", tipo: "Onboarding e desenvolvimento", icon: GraduationCap,
        titulo: "Estruturar uma imersão em seguros no onboarding",
        texto: "A competência em seguros ficou abaixo do esperado. Se ela é essencial para a função, torne-a obrigatória na seleção; se não, inclua uma trilha de imersão em seguros nos primeiros 90 dias.",
      });
    }
  }

  // 4) Comportamentos
  if (B !== null && B < 65) {
    const baixas = vaga.comportamentos.filter((b) => (avaliacao.comportamentosReal?.[b.id] ?? 3) <= 2 && b.peso >= 2).map((b) => b.nome);
    recs.push({
      prioridade: B < 50 ? "alta" : "média", tipo: "Processo seletivo", icon: Target,
      titulo: "Revisar a avaliação comportamental na seleção",
      texto: `Comportamentos em ${B}%${baixas.length ? `; os mais críticos para a vaga (${baixas.join(", ")}) ficaram abaixo do esperado` : ""}. Estruture perguntas comportamentais por competência na entrevista e revise se os comportamentos e prioridades definidos no formulário refletem o que o time realmente precisa.`,
    });
  }

  // 5) Bagagem (experiência/formação) segundo o gestor
  if (avaliacao.bagagem === "abaixo") {
    recs.push({
      prioridade: "média", tipo: "Escopo da vaga", icon: FileSearch,
      titulo: "Elevar os requisitos mínimos de experiência e formação",
      texto: `O gestor avalia que a bagagem ficou abaixo do necessário (pedido: ${vaga.experienciaAnos > 0 ? vaga.experienciaAnos + "+ anos" : "sem exigência"} de experiência e ${FORMACAO_NIVEIS[vaga.formacaoNivel]} como formação mínima).${fit.expAbaixo ? " Na seleção, o candidato já estava abaixo do mínimo de experiência." : ""} Reveja esses mínimos na próxima abertura.`,
    });
  }
  if (avaliacao.bagagem === "acima") {
    recs.push({
      prioridade: "baixa", tipo: "Escopo da vaga", icon: FileSearch,
      titulo: "Bagagem acima do necessário: atenção à retenção",
      texto: "A experiência e a formação da pessoa superam o que a função exige. Verifique desafios, plano de carreira e faixa salarial para reduzir o risco de saída — e considere se os mínimos pedidos na vaga podem ser mais flexíveis.",
    });
  }

  // 6) Calibração entre o previsto (alinhamento) e o real
  if (gap <= -15) {
    recs.push({
      prioridade: "alta", tipo: "Calibração do alinhamento", icon: Scale,
      titulo: "Recalibrar os critérios do alinhamento",
      texto: `O Fit Score previu ${fit.total}, mas o resultado real foi ${nota} (${gap}). O alinhamento definido na abertura (competências, comportamentos, obrigatoriedades e níveis) não explicou bem o sucesso desta vaga — revise os critérios e as evidências usadas na seleção.`,
    });
  } else if (gap >= 15) {
    recs.push({
      prioridade: "média", tipo: "Calibração do alinhamento", icon: Scale,
      titulo: "Os critérios podem estar mais rígidos que o necessário",
      texto: `A contratação superou o previsto (${fit.total} → ${nota}). Verifique se algum requisito obrigatório está excluindo bons candidatos sem necessidade real.`,
    });
  }

  // 7) Tudo certo
  if (recs.length === 0) {
    recs.push({
      prioridade: "baixa", tipo: "Boas práticas", icon: Lightbulb,
      titulo: "Manter os critérios e replicar a prática",
      texto: "O alinhamento definido na abertura se confirmou na prática. Use esta vaga como referência (template) para futuras aberturas do mesmo cargo e registre o que funcionou na seleção e no onboarding.",
    });
  }

  const ordem = { alta: 0, "média": 1, baixa: 2 };
  recs.sort((a, b) => ordem[a.prioridade] - ordem[b.prioridade]);

  const fortes = resultado.comps.filter((c) => c.valor !== null && c.valor >= 75).map((c) => c.label.toLowerCase());
  const atencao = resultado.comps.filter((c) => c.valor !== null && c.valor < 75).map((c) => `${c.label.toLowerCase()} (${c.valor}%)`);
  const verbo = { atende: "está atendendo", parcial: "está atendendo parcialmente", nao: "não está atendendo" }[veredito];
  let narrativa = `Com base no alinhamento definido na abertura da vaga "${vaga.titulo}", a contratação de ${candidato.nome} ${verbo} ao esperado: resultado real de ${nota} contra ${fit.total} previstos no Fit Score (${gap > 0 ? "+" : ""}${gap}).`;
  if (fortes.length) narrativa += ` Pontos fortes: ${fortes.join(", ")}.`;
  if (atencao.length) narrativa += ` Pontos de atenção: ${atencao.join(", ")}.`;

  return { veredito, narrativa, recs };
}

// ============================================================
// HELPERS DE DADOS
// ============================================================
function novaVagaVazia() {
  return {
    id: `vaga-${Date.now()}`, titulo: "", descricao: "", atividades: "",
    senioridade: 3, experienciaAnos: 3, formacaoNivel: 2, formacaoAreas: [],
    competencias: [], comportamentos: [], entregaveis: ["", "", ""],
  };
}

function perfilNeutro(vaga) {
  return {
    senioridade: vaga.senioridade, experienciaAnos: vaga.experienciaAnos, formacaoNivel: vaga.formacaoNivel,
    formacaoArea: vaga.formacaoAreas[0] || "Outras",
    competencias: Object.fromEntries(vaga.competencias.map((c) => [c.id, false])),
    comportamentos: Object.fromEntries(vaga.comportamentos.map((b) => [b.id, 3])),
    resumo: "", confianca: "media", fonte: "manual",
  };
}

function lerPorNome(obj, nome) {
  if (!obj || typeof obj !== "object") return undefined;
  if (Object.prototype.hasOwnProperty.call(obj, nome)) return obj[nome];
  const norm = (s) => String(s).toLowerCase().trim();
  const k = Object.keys(obj).find((x) => norm(x) === norm(nome));
  return k !== undefined ? obj[k] : undefined;
}
// ============================================================
// EXEMPLO PARA DEMONSTRAÇÃO (botões "Carregar exemplo") — dados fictícios.
// Competências e comportamentos são ligados por NOME, então o exemplo continua
// funcionando mesmo que o gestor edite a vaga.
// ============================================================
const descSugestao = (nome) => SUGESTOES_COMPORTAMENTOS.find((s) => s.nome === nome)?.exemplo || "";

const EXEMPLO_VAGA = {
  titulo: "Analista de Subscrição de Seguro Garantia – Pleno",
  descricao: "Vaga de expansão no time de Subscrição. A pessoa vai analisar e aprovar propostas de seguro garantia para construtoras e empresas de médio porte, apoiando o time comercial e os corretores. O objetivo é aumentar a capacidade de análise sem perder qualidade na avaliação de risco.",
  atividades: "- Analisar propostas de seguro garantia e emitir apólices\n- Avaliar a saúde financeira do cliente (balanços, DRE, fluxo de caixa)\n- Acompanhar a carteira de clientes e as renovações\n- Responder dúvidas e cotações de corretores\n- Reportar indicadores de prazo e qualidade ao gestor",
  senioridade: 3, experienciaAnos: 3, formacaoNivel: 2,
  formacaoAreas: ["Administração / Negócios", "Economia / Finanças", "Engenharias"],
  competencias: [
    { nome: "Experiência com Seguros", nivel: "obrigatoria", detalhe: "" },
    { nome: "Análise de crédito", nivel: "obrigatoria", detalhe: "Leitura de balanços, DRE e fluxo de caixa" },
    { nome: "Excel Avançado", nivel: "desejavel", detalhe: "" },
    { nome: "Leitura de contratos de obra e editais", nivel: "desejavel", detalhe: "" },
    { nome: "Espanhol", nivel: "desejavel", detalhe: "" },
  ],
  comportamentos: [
    { nome: "Raciocínio Analítico", peso: 3, descricao: descSugestao("Raciocínio Analítico") },
    { nome: "Atenção a Detalhes", peso: 3, descricao: descSugestao("Atenção a Detalhes") },
    { nome: "Organização e Gestão do Tempo", peso: 2, descricao: descSugestao("Organização e Gestão do Tempo") },
    { nome: "Escuta ativa com corretores", peso: 2, descricao: "Entende a necessidade do corretor antes de responder: faz perguntas e confirma o entendimento." },
  ],
  entregaveis: [
    "Assumir a carteira de 30 clientes da região Sul em até 30 dias",
    "Reduzir o tempo médio de análise de propostas de 5 para 3 dias úteis até o dia 90",
    "Emitir apólices com autonomia e no máximo 5% de retrabalho a partir do dia 60",
  ],
};

// "perfil" = leitura de exemplo já pronta, usada se a IA não responder no ambiente
const EXEMPLO_CANDIDATOS = [
  {
    chave: "marina", nome: "Marina Souza",
    texto: "Marina Souza. 7 anos de experiência. Analista de Subscrição na Seguradora Porto Azul (2019 até hoje): análise de propostas de seguro garantia e fiança para construtoras, leitura de balanços e DRE, emissão de apólices e acompanhamento de uma carteira de cerca de 40 contas. Antes, Analista de Crédito no Banco Meridional (2017-2019). Formação: Graduação em Economia e MBA em Finanças. Excel avançado (tabelas dinâmicas e macros) e Power BI. Inglês fluente.\nParecer da entrevista: raciocínio muito estruturado; explicou com clareza como define limites de crédito. Detalhista, revisa o próprio trabalho antes de entregar. Conta que costuma ligar para os corretores para entender o contexto antes de responder. Autônoma: assumiu sozinha a carteira nos primeiros dois meses.",
    perfil: {
      senioridade: 4, experienciaAnos: 7, formacaoNivel: 3, formacaoArea: "Economia / Finanças",
      competencias: { "Experiência com Seguros": true, "Análise de crédito": true, "Excel Avançado": true, "Leitura de contratos de obra e editais": false, "Espanhol": false },
      comportamentos: { "Raciocínio Analítico": 5, "Atenção a Detalhes": 5, "Organização e Gestão do Tempo": 4, "Escuta ativa com corretores": 4 },
      resumo: "Analista com 7 anos em seguro garantia e crédito. Raciocínio estruturado, detalhista e autônoma; já pratica a escuta ativa com corretores.",
      confianca: "alta",
    },
  },
  {
    chave: "bruno", nome: "Bruno Alcântara",
    texto: "Bruno Alcântara. 2 anos de experiência. Assistente administrativo em corretora de seguros (2022 até hoje): cadastro de propostas e atendimento telefônico a clientes, sem atividade de análise de risco. Formação: Administração, graduação em andamento (6º semestre). Excel intermediário.\nParecer da entrevista: simpático e comunicativo, mas respostas superficiais sobre análise de crédito. Precisou de orientação nos exemplos de caso e ainda depende de supervisão em tarefas novas.",
    perfil: {
      senioridade: 2, experienciaAnos: 2, formacaoNivel: 1, formacaoArea: "Administração / Negócios",
      competencias: { "Experiência com Seguros": true, "Análise de crédito": false, "Excel Avançado": false, "Leitura de contratos de obra e editais": false, "Espanhol": false },
      comportamentos: { "Raciocínio Analítico": 2, "Atenção a Detalhes": 3, "Organização e Gestão do Tempo": 3, "Escuta ativa com corretores": 3 },
      resumo: "Assistente em corretora há 2 anos, sem experiência em análise de risco. Comunicativo, mas ainda depende de supervisão em tarefas novas; graduação em andamento.",
      confianca: "media",
    },
  },
];

const EXEMPLO_AVALIACAO = {
  periodo: "180", senioridadeReal: 3, bagagem: "adequada",
  entregaveisStatus: ["entregue", "parcial", "nao"],
  competenciasReal: { "Experiência com Seguros": 5, "Análise de crédito": 4, "Excel Avançado": 4, "Leitura de contratos de obra e editais": 3, "Espanhol": 2 },
  comportamentosReal: { "Raciocínio Analítico": 5, "Atenção a Detalhes": 4, "Escuta ativa com corretores": 4, "Organização e Gestão do Tempo": 3 },
};

function vagaDeExemplo(idAtual) {
  const e = EXEMPLO_VAGA;
  return {
    id: idAtual, titulo: e.titulo, descricao: e.descricao, atividades: e.atividades,
    senioridade: e.senioridade, experienciaAnos: e.experienciaAnos, formacaoNivel: e.formacaoNivel,
    formacaoAreas: [...e.formacaoAreas],
    competencias: e.competencias.map((c) => ({ id: uid(), ...c })),
    comportamentos: e.comportamentos.map((b) => ({ id: uid(), ...b })),
    entregaveis: [...e.entregaveis],
  };
}

function perfilDeExemplo(vaga, exemplo) {
  const p = exemplo.perfil;
  return {
    senioridade: p.senioridade, experienciaAnos: p.experienciaAnos, formacaoNivel: p.formacaoNivel, formacaoArea: p.formacaoArea,
    competencias: Object.fromEntries(vaga.competencias.map((c) => [c.id, !!lerPorNome(p.competencias, c.nome)])),
    comportamentos: Object.fromEntries(vaga.comportamentos.map((b) => [b.id, Number(lerPorNome(p.comportamentos, b.nome)) || 3])),
    resumo: p.resumo, confianca: p.confianca, fonte: "exemplo",
  };
}

function avaliacaoDeExemplo(vaga) {
  const definidos = vaga.entregaveis.filter((e) => e.trim() !== "");
  return {
    periodo: EXEMPLO_AVALIACAO.periodo, senioridadeReal: EXEMPLO_AVALIACAO.senioridadeReal, bagagem: EXEMPLO_AVALIACAO.bagagem,
    entregaveisStatus: definidos.map((_, i) => EXEMPLO_AVALIACAO.entregaveisStatus[i] ?? "parcial"),
    competenciasReal: Object.fromEntries(vaga.competencias.map((c) => [c.id, Number(lerPorNome(EXEMPLO_AVALIACAO.competenciasReal, c.nome)) || 3])),
    comportamentosReal: Object.fromEntries(vaga.comportamentos.map((b) => [b.id, Number(lerPorNome(EXEMPLO_AVALIACAO.comportamentosReal, b.nome)) || 3])),
  };
}
// ---- fim da lógica de pontuação ----

async function extrairTextoDoArquivo(file) {
  const nome = file.name.toLowerCase();
  if (nome.endsWith(".txt")) return await file.text();
  if (nome.endsWith(".docx")) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }
  if (nome.endsWith(".pdf")) {
    if (!window.pdfjsLib) throw new Error("Leitor de PDF ainda carregando, tente novamente em alguns segundos.");
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let texto = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      texto += content.items.map((it) => it.str).join(" ") + "\n";
    }
    return texto;
  }
  throw new Error("Formato não suportado. Use .txt, .docx, .pdf — ou cole o texto diretamente.");
}

// A IA lê o currículo/parecer usando as competências e comportamentos que o gestor escreveu para ESTA vaga
async function analisarComIA(vaga, texto) {
  const comps = vaga.competencias;
  const behs = vaga.comportamentos;
  const areasList = FORMACAO_AREAS.map((a) => JSON.stringify(a)).join(", ");
  const compsTemplate = comps.map((c) => `${JSON.stringify(c.nome)}: true|false`).join(", ");
  const behsTemplate = behs.map((b) => `${JSON.stringify(b.nome)}: 1 a 5`).join(", ");

  const contextoVaga = [
    `Título: ${vaga.titulo}`,
    vaga.descricao.trim() && `Descrição da vaga: ${vaga.descricao.trim().slice(0, 1500)}`,
    vaga.atividades.trim() && `Principais atividades: ${vaga.atividades.trim().slice(0, 1500)}`,
  ].filter(Boolean).join("\n");
  const compsDetalhe = comps.map((c) => `- ${c.nome}${c.detalhe ? ` (${c.detalhe})` : ""}`).join("\n") || "(nenhuma definida)";
  const behsDetalhe = behs.map((b) => `- ${b.nome}${b.descricao ? `: ${b.descricao}` : ""}`).join("\n") || "(nenhum definido)";

  const prompt = `Você é um analista de People Analytics lendo o currículo e/ou parecer de entrevista de um candidato a uma vaga.

CONTEXTO DA VAGA:
${contextoVaga}

COMPETÊNCIAS TÉCNICAS QUE O GESTOR DEFINIU:
${compsDetalhe}

COMPORTAMENTOS QUE O GESTOR DEFINIU (e o que significam nesta vaga):
${behsDetalhe}

TEXTO DO CANDIDATO (currículo e/ou parecer):
"""
${texto.slice(0, 8000)}
"""

Extraia um perfil estruturado. Responda APENAS com um JSON válido (sem texto antes ou depois, sem markdown), no formato exato:
{
  "competencias": { ${compsTemplate} },
  "senioridade": 1 a 5 (1=precisa de supervisão constante, 5=define estratégia sem supervisão),
  "experienciaAnos": número inteiro (anos totais de experiência profissional relevante, estimados pelo texto; 0 se não houver evidência),
  "formacaoNivel": 1 a 4 (1=ensino médio/técnico, 2=graduação, 3=pós-graduação/MBA, 4=mestrado/doutorado — o maior nível concluído ou em curso avançado),
  "formacaoArea": uma destas opções exatas: ${areasList},
  "comportamentos": { ${behsTemplate} },
  "resumo": "2-3 frases resumindo o perfil frente às atividades da vaga, em linguagem simples",
  "confianca": "baixa" | "media" | "alta" (baixa se o texto for muito curto ou vago)
}

Regras: use exatamente os nomes de competências e de comportamentos listados acima como chaves. Marque uma competência como true somente se houver evidência no texto; para competências ligadas a seguros, exija atuação profissional comprovada em seguradora, corretora, resseguro ou área de seguros. Para comportamentos, dê nota 3 (neutra) quando não houver evidência clara e reflita isso em "confianca".`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
  });
  if (!response.ok) throw new Error(`Erro na API (${response.status})`);
  const data = await response.json();
  const textoResposta = data.content.map((b) => b.text || "").join("\n");
  const parsed = JSON.parse(textoResposta.replace(/```json|```/g, "").trim());

  const competencias = {};
  comps.forEach((c) => { competencias[c.id] = !!lerPorNome(parsed.competencias, c.nome); });
  const comportamentos = {};
  behs.forEach((b) => { comportamentos[b.id] = Math.min(5, Math.max(1, Number(lerPorNome(parsed.comportamentos, b.nome)) || 3)); });

  return {
    competencias, comportamentos,
    senioridade: Math.min(5, Math.max(1, Number(parsed.senioridade) || 3)),
    experienciaAnos: Math.min(40, Math.max(0, Math.round(Number(parsed.experienciaAnos) || 0))),
    formacaoNivel: Math.min(4, Math.max(1, Math.round(Number(parsed.formacaoNivel) || 2))),
    formacaoArea: FORMACAO_AREAS.includes(parsed.formacaoArea) ? parsed.formacaoArea : "Outras",
    resumo: parsed.resumo || "", confianca: parsed.confianca || "media", fonte: "ia",
  };
}

// ============================================================
// UI: componentes pequenos
// ============================================================
function Pill({ children, tone = "neutral" }) {
  const tones = {
    neutral: { bg: "#fff", border: BORDER, color: "#1a1a1a" },
    green: { bg: EMERALD, border: EMERALD, color: "#fff" },
    sky: { bg: SKY_BLUE, border: SKY_BLUE, color: "#1a1a1a" },
    yellow: { bg: SUN_YELLOW, border: SUN_YELLOW, color: "#1a1a1a" },
  };
  const t = tones[tone];
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold"
      style={{ backgroundColor: t.bg, border: `1px solid ${t.border}`, color: t.color }}>{children}</span>
  );
}

function FontePill({ c }) {
  if (c.fonte === "manual") return <Pill tone="neutral"><Pencil size={11} /> Preenchido manualmente</Pill>;
  if (c.fonte === "exemplo") return <Pill tone="yellow"><Sparkles size={11} /> Leitura de exemplo</Pill>;
  return (
    <Pill tone={c.confianca === "baixa" ? "yellow" : "sky"}>
      <Bot size={11} /> {c.confianca === "baixa" ? "Confiança baixa" : "Analisado por IA"}
    </Pill>
  );
}

function ProgressBar({ label, value, color }) {
  return (
    <div className="mb-2.5">
      <div className="flex justify-between text-xs mb-1 gap-2" style={{ color: MUTED }}>
        <span>{label}</span>
        <span className="font-semibold" style={{ color: "#1a1a1a" }}>{value}</span>
      </div>
      <div className="h-2 rounded-full w-full" style={{ backgroundColor: "#EDEAE2" }}>
        <div className="h-2 rounded-full" style={{ width: `${Math.max(0, Math.min(100, value))}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function StepTab({ icon: Icon, label, active, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
      style={{ borderColor: active ? AVLA_BLUE : "transparent", color: active ? AVLA_BLUE : "#4a4a4a" }}>
      <Icon size={16} />{label}
    </button>
  );
}

function SubTabs({ tabs, active, onChange }) {
  return (
    <div className="inline-flex rounded-lg p-1 mb-5" style={{ backgroundColor: "#E9E6DD" }}>
      {tabs.map((t) => (
        <button key={t.id} onClick={() => onChange(t.id)} className="px-4 py-2 rounded-md text-sm font-semibold transition-colors"
          style={{
            backgroundColor: active === t.id ? "white" : "transparent",
            color: active === t.id ? AVLA_BLUE : "#4a4a4a",
            boxShadow: active === t.id ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
          }}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

function Card({ title, subtitle, children }) {
  return (
    <div className="bg-white rounded-xl border p-5" style={{ borderColor: BORDER }}>
      {title && <h3 className="font-bold text-base mb-0.5">{title}</h3>}
      {subtitle && <p className="text-sm mb-4" style={{ color: MUTED }}>{subtitle}</p>}
      {children}
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm py-1.5 border-b last:border-0 gap-3" style={{ borderColor: "#EFEBE3" }}>
      <span style={{ color: MUTED }}>{label}</span>
      <span className="font-semibold text-right">{value}</span>
    </div>
  );
}

const SELECT_CLASS = "w-full border rounded-lg px-3 py-2 text-sm bg-white outline-none";
const TEXT_CLASS = "w-full border rounded-lg px-3 py-2 text-sm outline-none";
const ABAS_PERFIL = [{ id: "alinhamento", label: "Alinhamento" }, { id: "comportamentos", label: "Comportamentos" }];

// ============================================================
// APP
// ============================================================
export default function App() {
  const [vagas, setVagas] = useState([]);
  const [selectedVagaId, setSelectedVagaId] = useState(null);
  const [candidatos, setCandidatos] = useState({});
  const [contratados, setContratados] = useState({});
  const [avaliacoes, setAvaliacoes] = useState({});
  const [draft, setDraft] = useState(novaVagaVazia());
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (window.pdfjsLib) return;
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    };
    document.body.appendChild(script);
  }, []);

  const selectedVaga = vagas.find((v) => v.id === selectedVagaId) || null;
  const candidatosDaVaga = selectedVagaId ? (candidatos[selectedVagaId] || []) : [];
  const candidatoContratadoId = selectedVagaId ? contratados[selectedVagaId] : null;
  const candidatoContratado = candidatosDaVaga.find((c) => c.id === candidatoContratadoId) || null;
  const avaliacaoContratado = candidatoContratadoId ? avaliacoes[candidatoContratadoId] : null;

  function salvarVaga() {
    if (!draft.titulo.trim()) return;
    const vaga = { ...draft };
    setVagas((prev) => [...prev, vaga]);
    setCandidatos((prev) => ({ ...prev, [vaga.id]: [] }));
    setSelectedVagaId(vaga.id);
    setDraft(novaVagaVazia());
    setStep(2);
  }
  function adicionarCandidato(candidato) {
    setCandidatos((prev) => ({ ...prev, [selectedVaga.id]: [...(prev[selectedVaga.id] || []), candidato] }));
  }
  function marcarContratado(candidatoId) {
    setContratados((prev) => ({ ...prev, [selectedVaga.id]: candidatoId }));
    setStep(4);
  }
  function salvarAvaliacao(candidatoId, avaliacao) {
    setAvaliacoes((prev) => ({ ...prev, [candidatoId]: avaliacao }));
  }
  // Cria (ou reaproveita) a vaga de exemplo com os dois candidatos já lidos e abre o ranking
  function carregarExemploCompleto() {
    const existente = vagas.find((v) => v.titulo === EXEMPLO_VAGA.titulo);
    const vaga = existente || vagaDeExemplo(`vaga-${Date.now()}`);
    const jaTem = (candidatos[vaga.id] || []).map((c) => c.nome.toLowerCase());
    const novos = EXEMPLO_CANDIDATOS
      .filter((e) => !jaTem.includes(e.nome.toLowerCase()))
      .map((e) => ({ id: `cand-${Date.now()}-${e.chave}`, nome: e.nome, ...perfilDeExemplo(vaga, e) }));
    if (!existente) setVagas((prev) => [...prev, vaga]);
    setCandidatos((prev) => ({ ...prev, [vaga.id]: [...(prev[vaga.id] || []), ...novos] }));
    setSelectedVagaId(vaga.id);
    setStep(3);
  }

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: BEIGE, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <div className="w-full" style={{ backgroundColor: AVLA_BLUE }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <img src={LOGO_AVLA_BRANCA} alt="Avla" style={{ height: 30, width: "auto", display: "block" }} />
            <span className="h-6 w-px bg-white/30" />
            <span className="text-white text-sm font-medium">Simulador · Qualidade de Contratação</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md" style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white" }}>
            <Sparkles size={13} /> Protótipo v4
          </div>
        </div>
      </div>

      <div className="w-full bg-white border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-3 overflow-x-auto">
          <span className="text-xs font-semibold uppercase tracking-wide whitespace-nowrap" style={{ color: MUTED }}>Vagas:</span>
          {vagas.length === 0 && <span className="text-sm" style={{ color: MUTED }}>Nenhuma vaga criada ainda.</span>}
          {vagas.map((v) => (
            <button key={v.id} onClick={() => { setSelectedVagaId(v.id); setStep(2); }}
              className="whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-medium border transition-colors"
              style={{ borderColor: v.id === selectedVagaId ? AVLA_BLUE : BORDER, backgroundColor: v.id === selectedVagaId ? "#EAF4FF" : "white", color: "#1a1a1a" }}>
              {v.titulo}
            </button>
          ))}
          <button onClick={() => { setDraft(novaVagaVazia()); setSelectedVagaId(null); setStep(1); }}
            className="whitespace-nowrap flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-semibold" style={{ color: AVLA_BLUE }}>
            <Plus size={15} /> Nova vaga
          </button>
          <button onClick={carregarExemploCompleto} title="Cria a vaga de exemplo com dois candidatos já analisados e abre o ranking"
            className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold border bg-white" style={{ borderColor: BORDER, color: "#4a4a4a" }}>
            <Sparkles size={14} /> Exemplo completo
          </button>
        </div>
      </div>

      <div className="w-full bg-white border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-6xl mx-auto px-6 flex gap-2 overflow-x-auto">
          <StepTab icon={ClipboardList} label="1. Formulário do Gestor" active={step === 1} onClick={() => setStep(1)} />
          <StepTab icon={Upload} label="2. Currículo / Parecer" active={step === 2} onClick={() => setStep(2)} disabled={!selectedVaga} />
          <StepTab icon={BarChart3} label="3. Painel de Fit Score" active={step === 3} onClick={() => setStep(3)} disabled={!selectedVaga} />
          <StepTab icon={ClipboardCheck} label="4. Avaliação 90/180 dias" active={step === 4} onClick={() => setStep(4)} disabled={!candidatoContratado} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {step === 1 && <FormularioGestor draft={draft} setDraft={setDraft} onSalvar={salvarVaga} />}
        {step === 2 && selectedVaga && (
          <EtapaCandidatos vaga={selectedVaga} candidatos={candidatosDaVaga} onAdicionar={adicionarCandidato} onIrParaPainel={() => setStep(3)} />
        )}
        {step === 3 && selectedVaga && (
          <PainelFitScore vaga={selectedVaga} candidatos={candidatosDaVaga} contratadoId={candidatoContratadoId} onContratar={marcarContratado} />
        )}
        {step === 4 && selectedVaga && candidatoContratado && (
          <AvaliacaoDesempenho
            key={candidatoContratado.id}
            vaga={selectedVaga}
            candidato={candidatoContratado}
            fit={calcularFitScore(selectedVaga, candidatoContratado)}
            avaliacaoSalva={avaliacaoContratado}
            onSalvar={(av) => salvarAvaliacao(candidatoContratado.id, av)}
          />
        )}
      </div>
    </div>
  );
}

// ============================================================
// EDITORES ABERTOS: competências e comportamentos (sugestões + texto livre)
// ============================================================
function CompetenciasEditor({ draft, setDraft }) {
  const [novo, setNovo] = useState("");
  const jaTem = (nome) => draft.competencias.some((c) => c.nome.toLowerCase() === nome.trim().toLowerCase());

  function add(nome, nivel = "desejavel") {
    const n = nome.trim();
    if (!n || jaTem(n)) return;
    setDraft((d) => ({ ...d, competencias: [...d.competencias, { id: uid(), nome: n, nivel, detalhe: "" }] }));
  }
  const update = (id, patch) => setDraft((d) => ({ ...d, competencias: d.competencias.map((c) => (c.id === id ? { ...c, ...patch } : c)) }));
  const remove = (id) => setDraft((d) => ({ ...d, competencias: d.competencias.filter((c) => c.id !== id) }));
  const sugestoes = SUGESTOES_COMPETENCIAS.filter((s) => !jaTem(s));

  return (
    <Card title="Competências" subtitle="Escreva as competências técnicas que a função exige, ou escolha entre as sugestões. Marque cada uma como Obrigatória ou Desejável.">
      <div className="flex gap-2 mb-4">
        <input value={novo} onChange={(e) => setNovo(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(novo); setNovo(""); } }}
          placeholder="Escreva uma competência (ex.: Subscrição de riscos) e tecle Enter"
          className={TEXT_CLASS} style={{ borderColor: BORDER }} />
        <button onClick={() => { add(novo); setNovo(""); }} disabled={!novo.trim()}
          className="flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg text-white whitespace-nowrap disabled:opacity-40" style={{ backgroundColor: AVLA_BLUE }}>
          <Plus size={14} /> Adicionar
        </button>
      </div>

      {draft.competencias.length === 0 ? (
        <p className="text-sm mb-4 px-3 py-3 rounded-lg" style={{ backgroundColor: "#F8F7F2", color: MUTED }}>
          Nenhuma competência adicionada ainda. Escreva a sua acima ou clique em uma sugestão abaixo.
        </p>
      ) : (
        <div className="space-y-2.5 mb-4">
          {draft.competencias.map((c) => (
            <div key={c.id} className="rounded-lg border p-3" style={{ borderColor: BORDER }}>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-sm font-semibold">{c.nome}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => update(c.id, { nivel: "obrigatoria" })} className="text-xs font-semibold px-2.5 py-1 rounded-md border"
                    style={{ borderColor: c.nivel === "obrigatoria" ? AVLA_BLUE : BORDER, backgroundColor: c.nivel === "obrigatoria" ? AVLA_BLUE : "white", color: c.nivel === "obrigatoria" ? "white" : "#4a4a4a" }}>
                    Obrigatória
                  </button>
                  <button onClick={() => update(c.id, { nivel: "desejavel" })} className="text-xs font-semibold px-2.5 py-1 rounded-md border"
                    style={{ borderColor: c.nivel === "desejavel" ? SKY_BLUE : BORDER, backgroundColor: c.nivel === "desejavel" ? SKY_BLUE : "white", color: "#1a1a1a" }}>
                    Desejável
                  </button>
                  <button onClick={() => remove(c.id)} aria-label={`Remover ${c.nome}`} className="p-1 rounded-md" style={{ color: MUTED }}>
                    <X size={16} />
                  </button>
                </div>
              </div>
              <input value={c.detalhe} onChange={(e) => update(c.id, { detalhe: e.target.value })}
                placeholder="Detalhe (opcional): o que exatamente se espera? Ex.: tabelas dinâmicas e macros"
                className="w-full border rounded-md px-2.5 py-1.5 text-xs mt-2 outline-none" style={{ borderColor: BORDER }} />
            </div>
          ))}
        </div>
      )}

      <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: MUTED }}>Sugestões (clique para adicionar)</p>
      <div className="flex flex-wrap gap-2">
        {sugestoes.map((s) => (
          <button key={s} onClick={() => add(s)} className="text-xs font-semibold px-2.5 py-1.5 rounded-md border bg-white" style={{ borderColor: BORDER, color: "#4a4a4a" }}>
            + {s}
          </button>
        ))}
        {sugestoes.length === 0 && <span className="text-xs" style={{ color: MUTED }}>Todas as sugestões já foram adicionadas.</span>}
      </div>
    </Card>
  );
}

function ComportamentosEditor({ draft, setDraft }) {
  const [novo, setNovo] = useState("");
  const jaTem = (nome) => draft.comportamentos.some((b) => b.nome.toLowerCase() === nome.trim().toLowerCase());

  function add(nome, descricao = "") {
    const n = nome.trim();
    if (!n || jaTem(n)) return;
    setDraft((d) => ({ ...d, comportamentos: [...d.comportamentos, { id: uid(), nome: n, peso: 2, descricao }] }));
  }
  const update = (id, patch) => setDraft((d) => ({ ...d, comportamentos: d.comportamentos.map((b) => (b.id === id ? { ...b, ...patch } : b)) }));
  const remove = (id) => setDraft((d) => ({ ...d, comportamentos: d.comportamentos.filter((b) => b.id !== id) }));
  const sugestoes = SUGESTOES_COMPORTAMENTOS.filter((s) => !jaTem(s.nome));

  return (
    <Card title="Comportamentos" subtitle="Escreva os comportamentos que fazem diferença nesta vaga, ou escolha entre as sugestões. Descreva com um exemplo o que isso significa na prática e defina a prioridade.">
      <div className="flex gap-2 mb-4">
        <input value={novo} onChange={(e) => setNovo(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(novo); setNovo(""); } }}
          placeholder="Escreva um comportamento (ex.: Escuta ativa) e tecle Enter"
          className={TEXT_CLASS} style={{ borderColor: BORDER }} />
        <button onClick={() => { add(novo); setNovo(""); }} disabled={!novo.trim()}
          className="flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg text-white whitespace-nowrap disabled:opacity-40" style={{ backgroundColor: AVLA_BLUE }}>
          <Plus size={14} /> Adicionar
        </button>
      </div>

      {draft.comportamentos.length === 0 ? (
        <p className="text-sm mb-4 px-3 py-3 rounded-lg" style={{ backgroundColor: "#F8F7F2", color: MUTED }}>
          Nenhum comportamento adicionado ainda. Escreva o seu acima ou clique em uma sugestão abaixo.
        </p>
      ) : (
        <div className="space-y-2.5 mb-4">
          {draft.comportamentos.map((b) => (
            <div key={b.id} className="rounded-lg border p-3" style={{ borderColor: BORDER }}>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-sm font-semibold">{b.nome}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs mr-1" style={{ color: MUTED }}>Prioridade:</span>
                  {[1, 2, 3].map((w) => (
                    <button key={w} onClick={() => update(b.id, { peso: w })} className="text-xs font-semibold px-2.5 py-1 rounded-md border"
                      style={{ borderColor: b.peso === w ? EMERALD : BORDER, backgroundColor: b.peso === w ? EMERALD : "white", color: b.peso === w ? "white" : "#4a4a4a" }}>
                      {WEIGHT_LABELS[w]}
                    </button>
                  ))}
                  <button onClick={() => remove(b.id)} aria-label={`Remover ${b.nome}`} className="p-1 rounded-md ml-1" style={{ color: MUTED }}>
                    <X size={16} />
                  </button>
                </div>
              </div>
              <textarea value={b.descricao} onChange={(e) => update(b.id, { descricao: e.target.value })} rows={2}
                placeholder="O que isso significa nesta vaga? Escreva um exemplo de comportamento observável."
                className="w-full border rounded-md px-2.5 py-1.5 text-xs mt-2 outline-none" style={{ borderColor: BORDER }} />
            </div>
          ))}
        </div>
      )}

      <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: MUTED }}>Sugestões com exemplo (clique para adicionar)</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {sugestoes.map((s) => (
          <button key={s.nome} onClick={() => add(s.nome, s.exemplo)} className="text-left rounded-lg border bg-white p-2.5" style={{ borderColor: BORDER }}>
            <span className="block text-xs font-bold" style={{ color: AVLA_BLUE }}>+ {s.nome}</span>
            <span className="block text-xs mt-0.5" style={{ color: MUTED }}>{s.exemplo}</span>
          </button>
        ))}
        {sugestoes.length === 0 && <span className="text-xs" style={{ color: MUTED }}>Todas as sugestões já foram adicionadas.</span>}
      </div>
    </Card>
  );
}

// ============================================================
// ETAPA 1 — FORMULÁRIO DO GESTOR (abas: Alinhamento | Comportamentos)
// ============================================================
function FormularioGestor({ draft, setDraft, onSalvar }) {
  const [aba, setAba] = useState("alinhamento");

  function setEntregavel(i, value) {
    setDraft((d) => { const arr = [...d.entregaveis]; arr[i] = value; return { ...d, entregaveis: arr }; });
  }
  function toggleArea(area) {
    setDraft((d) => ({ ...d, formacaoAreas: d.formacaoAreas.includes(area) ? d.formacaoAreas.filter((a) => a !== area) : [...d.formacaoAreas, area] }));
  }

  const expLabel = EXPERIENCIA_OPCOES.find((o) => o.v === draft.experienciaAnos)?.label;
  const nObrig = draft.competencias.filter((c) => c.nivel === "obrigatoria").length;
  const nDesej = draft.competencias.filter((c) => c.nivel === "desejavel").length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <SubTabs tabs={ABAS_PERFIL} active={aba} onChange={setAba} />
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span className="text-xs" style={{ color: MUTED }}>Só para ver funcionando? Substitui o que está preenchido.</span>
            <button onClick={() => { setDraft((d) => vagaDeExemplo(d.id)); setAba("alinhamento"); }}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border bg-white" style={{ borderColor: AVLA_BLUE, color: AVLA_BLUE }}>
              <Sparkles size={13} /> Carregar exemplo
            </button>
          </div>
        </div>

        {aba === "alinhamento" && (
          <div className="space-y-6">
            <Card title="Sobre a vaga" subtitle="Comece descrevendo a vaga e as atividades com as suas palavras. A IA usa esse texto para ler os currículos.">
              <label className="block text-sm font-semibold mb-1.5">Título da vaga</label>
              <input value={draft.titulo} onChange={(e) => setDraft((d) => ({ ...d, titulo: e.target.value }))}
                placeholder="Ex.: Analista de Subscrição Pleno"
                className={`${TEXT_CLASS} mb-4`} style={{ borderColor: BORDER }} />

              <label className="block text-sm font-semibold mb-1.5">Descrição da vaga</label>
              <textarea value={draft.descricao} onChange={(e) => setDraft((d) => ({ ...d, descricao: e.target.value }))} rows={4}
                placeholder="Por que a vaga existe? Em qual time e contexto ela atua? Qual o objetivo da posição e o que se espera dela?"
                className={`${TEXT_CLASS} mb-4`} style={{ borderColor: BORDER }} />

              <label className="block text-sm font-semibold mb-1.5">Descrição das atividades</label>
              <textarea value={draft.atividades} onChange={(e) => setDraft((d) => ({ ...d, atividades: e.target.value }))} rows={6}
                placeholder={"Liste as principais atividades do dia a dia (uma por linha). Ex.:\n- Analisar propostas de seguro garantia e emitir apólices\n- Acompanhar a carteira de clientes e renovações\n- Apoiar o time comercial com cotações"}
                className={`${TEXT_CLASS} mb-4`} style={{ borderColor: BORDER }} />

              <label className="block text-sm font-semibold mb-1.5">Senioridade / autonomia esperada</label>
              <input type="range" min={1} max={5} step={1} value={draft.senioridade}
                onChange={(e) => setDraft((d) => ({ ...d, senioridade: Number(e.target.value) }))}
                className="w-full" style={{ accentColor: AVLA_BLUE }} />
              <div className="flex justify-between text-xs mt-1" style={{ color: MUTED }}>{[1, 2, 3, 4, 5].map((n) => <span key={n}>{n}</span>)}</div>
              <p className="text-sm mt-2 font-medium px-3 py-2 rounded-md" style={{ backgroundColor: "#EAF4FF", color: AVLA_BLUE }}>
                Nível {draft.senioridade}: {SENIORITY_LABELS[draft.senioridade]}
              </p>
            </Card>

            <Card title="Experiência e formação" subtitle="Os mínimos que a função realmente exige">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Tempo de experiência</label>
                  <select value={draft.experienciaAnos} onChange={(e) => setDraft((d) => ({ ...d, experienciaAnos: Number(e.target.value) }))}
                    className={SELECT_CLASS} style={{ borderColor: BORDER }}>
                    {EXPERIENCIA_OPCOES.map((o) => <option key={o.v} value={o.v}>{o.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Formação mínima</label>
                  <select value={draft.formacaoNivel} onChange={(e) => setDraft((d) => ({ ...d, formacaoNivel: Number(e.target.value) }))}
                    className={SELECT_CLASS} style={{ borderColor: BORDER }}>
                    {Object.entries(FORMACAO_NIVEIS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
              </div>
              <label className="block text-sm font-semibold mb-1.5">Áreas de formação aceitas</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {FORMACAO_AREAS.map((a) => {
                  const on = draft.formacaoAreas.includes(a);
                  return (
                    <button key={a} onClick={() => toggleArea(a)} className="text-xs font-semibold px-2.5 py-1.5 rounded-md border"
                      style={{ borderColor: on ? AVLA_BLUE : BORDER, backgroundColor: on ? AVLA_BLUE : "white", color: on ? "white" : "#4a4a4a" }}>
                      {on ? "✓ " : ""}{a}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs flex items-start gap-1" style={{ color: MUTED }}>
                <Info size={13} className="mt-0.5 shrink-0" /> Sem seleção = qualquer área. Evite exigir instituição específica: não é critério técnico.
              </p>
            </Card>

            <CompetenciasEditor draft={draft} setDraft={setDraft} />

            <Card title="Entregáveis dos primeiros 90 dias" subtitle="Até 3 entregas concretas que definem sucesso nesse período">
              <div className="space-y-2.5">
                {draft.entregaveis.map((v, i) => (
                  <input key={i} value={v} onChange={(e) => setEntregavel(i, e.target.value)}
                    placeholder={`Entregável ${i + 1} (ex.: assumir carteira de clientes X)`}
                    className={TEXT_CLASS} style={{ borderColor: BORDER }} />
                ))}
              </div>
            </Card>

            <button onClick={() => setAba("comportamentos")} className="flex items-center gap-2 font-semibold text-sm py-2.5 px-4 rounded-lg border bg-white" style={{ borderColor: BORDER, color: AVLA_BLUE }}>
              Próximo: Comportamentos <ArrowRight size={15} />
            </button>
          </div>
        )}

        {aba === "comportamentos" && (
          <div className="space-y-6">
            <ComportamentosEditor draft={draft} setDraft={setDraft} />
            <button onClick={() => setAba("alinhamento")} className="flex items-center gap-2 font-semibold text-sm py-2.5 px-4 rounded-lg border bg-white" style={{ borderColor: BORDER, color: AVLA_BLUE }}>
              <ArrowLeft size={15} /> Voltar ao alinhamento
            </button>
          </div>
        )}
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-6 space-y-4">
          <Card title="Resumo da vaga">
            <SummaryRow label="Título" value={draft.titulo || "—"} />
            <SummaryRow label="Descrição da vaga" value={draft.descricao.trim() ? "Preenchida" : "—"} />
            <SummaryRow label="Descrição das atividades" value={draft.atividades.trim() ? "Preenchida" : "—"} />
            <SummaryRow label="Senioridade" value={`Nível ${draft.senioridade}`} />
            <SummaryRow label="Experiência" value={expLabel} />
            <SummaryRow label="Formação mínima" value={FORMACAO_NIVEIS[draft.formacaoNivel]} />
            <SummaryRow label="Competências" value={`${nObrig} obrigat. · ${nDesej} desej.`} />
            <SummaryRow label="Comportamentos" value={`${draft.comportamentos.length} (${draft.comportamentos.filter((b) => b.peso === 3).length} de prioridade alta)`} />
            <SummaryRow label="Entregáveis definidos" value={draft.entregaveis.filter((e) => e.trim()).length} />
            <button onClick={onSalvar} disabled={!draft.titulo.trim()}
              className="w-full mt-4 flex items-center justify-center gap-2 font-semibold text-sm py-2.5 rounded-lg text-white disabled:opacity-40"
              style={{ backgroundColor: AVLA_BLUE }}>
              Salvar vaga e adicionar candidatos <ArrowRight size={16} />
            </button>
            {!draft.titulo.trim() && (
              <p className="text-xs mt-2 flex items-center gap-1" style={{ color: MUTED }}><Info size={13} /> Dê um título à vaga (aba Alinhamento) para continuar.</p>
            )}
            {draft.titulo.trim() && (draft.competencias.length === 0 || draft.comportamentos.length === 0) && (
              <p className="text-xs mt-2 flex items-start gap-1" style={{ color: "#B45309" }}>
                <Info size={13} className="mt-0.5 shrink-0" />
                {draft.competencias.length === 0 && draft.comportamentos.length === 0
                  ? "Sem competências e sem comportamentos, o Fit Score considera só experiência, formação e senioridade."
                  : draft.competencias.length === 0
                    ? "Sem competências, o Fit Score não avalia a parte técnica."
                    : "Sem comportamentos, o Fit Score não avalia a parte comportamental."}
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ETAPA 2 — CANDIDATOS VIA CURRÍCULO / PARECER
// ============================================================
function EtapaCandidatos({ vaga, candidatos, onAdicionar, onIrParaPainel }) {
  const [mostrarForm, setMostrarForm] = useState(candidatos.length === 0);
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: MUTED }}>Vaga: {vaga.titulo}</p>
          <h2 className="text-xl font-bold">Candidatos por currículo ou parecer</h2>
          <p className="text-sm mt-1" style={{ color: MUTED }}>
            Anexe um arquivo (.pdf, .docx, .txt) ou cole o texto do currículo e/ou do parecer da entrevista. A IA lê o conteúdo usando a descrição, as competências e os comportamentos que o gestor escreveu — você revisa e confirma antes de entrar no ranking.
          </p>
        </div>
        {candidatos.length > 0 && (
          <div className="flex gap-2">
            <button onClick={() => setMostrarForm((v) => !v)} className="flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg border bg-white" style={{ borderColor: BORDER }}>
              <Plus size={14} /> {mostrarForm ? "Fechar" : "Adicionar candidato"}
            </button>
            <button onClick={onIrParaPainel} className="flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg text-white" style={{ backgroundColor: AVLA_BLUE }}>
              Ver Fit Score <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>

      {mostrarForm && <NovoCandidatoForm vaga={vaga} candidatosExistentes={candidatos} onConfirmar={(c) => { onAdicionar(c); setMostrarForm(false); }} />}

      {candidatos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {candidatos.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border p-4" style={{ borderColor: BORDER }}>
              <div className="flex items-center justify-between mb-2 gap-2">
                <span className="font-bold">{c.nome}</span>
                <FontePill c={c} />
              </div>
              <p className="text-xs mb-1" style={{ color: MUTED }}>
                Senioridade {c.senioridade} · {c.experienciaAnos} {c.experienciaAnos === 1 ? "ano" : "anos"} de experiência
              </p>
              <p className="text-xs mb-2" style={{ color: MUTED }}>{FORMACAO_NIVEIS[c.formacaoNivel]} · {c.formacaoArea}</p>
              {c.resumo && <p className="text-xs mb-2 italic" style={{ color: "#4a4a4a" }}>“{c.resumo}”</p>}
              <div className="flex flex-wrap gap-1.5">
                {vaga.competencias.filter((x) => c.competencias[x.id]).map((x) => (
                  <span key={x.id} className="text-xs px-2 py-0.5 rounded-md" style={{ backgroundColor: "#F0EEE7", color: "#4a4a4a" }}>{x.nome}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NovoCandidatoForm({ vaga, candidatosExistentes, onConfirmar }) {
  const [nome, setNome] = useState("");
  const [texto, setTexto] = useState("");
  const [arquivoNome, setArquivoNome] = useState("");
  const [status, setStatus] = useState("idle");
  const [erro, setErro] = useState("");
  const [perfil, setPerfil] = useState(null);
  const [exemploChave, setExemploChave] = useState(null);
  const fileInputRef = useRef(null);
  const proximoExemplo = EXEMPLO_CANDIDATOS.find((e) => !candidatosExistentes.some((c) => c.nome.toLowerCase() === e.nome.toLowerCase()));

  function carregarExemplo() {
    if (!proximoExemplo) return;
    setNome(proximoExemplo.nome);
    setTexto(proximoExemplo.texto);
    setArquivoNome("");
    setErro("");
    setStatus("idle");
    setExemploChave(proximoExemplo.chave);
  }

  async function handleArquivo(e) {
    const file = e.target.files[0];
    if (!file) return;
    setArquivoNome(file.name);
    setStatus("lendo");
    setErro("");
    try {
      setTexto(await extrairTextoDoArquivo(file));
      setExemploChave(null);
      setStatus("idle");
    } catch (err) {
      setErro(err.message);
      setStatus("erro");
    }
  }

  async function handleAnalisar() {
    if (!texto.trim()) { setErro("Cole o texto ou anexe um arquivo primeiro."); setStatus("erro"); return; }
    setStatus("analisando");
    setErro("");
    try {
      setPerfil(await analisarComIA(vaga, texto));
      setStatus("revisando");
    } catch (err) {
      const exemplo = EXEMPLO_CANDIDATOS.find((e) => e.chave === exemploChave);
      if (exemplo) {
        setErro("A IA não respondeu neste ambiente, então carreguei a leitura de exemplo já preparada para este candidato (marcada como exemplo). Revise normalmente.");
        setPerfil(perfilDeExemplo(vaga, exemplo));
      } else {
        setErro("Não foi possível analisar com a IA (" + err.message + "). Preencha manualmente abaixo.");
        setPerfil(perfilNeutro(vaga));
      }
      setStatus("revisando");
    }
  }

  function preencherManualmente() { setPerfil(perfilNeutro(vaga)); setErro(""); setStatus("revisando"); }
  function confirmar() {
    if (!nome.trim() || !perfil) return;
    onConfirmar({ id: `cand-${Date.now()}`, nome: nome.trim(), ...perfil });
  }

  if (status === "revisando" && perfil) {
    return <RevisaoPerfil vaga={vaga} nome={nome} setNome={setNome} perfil={perfil} setPerfil={setPerfil} erro={erro} onConfirmar={confirmar} onCancelar={() => setStatus("idle")} />;
  }

  return (
    <Card title="Novo candidato" subtitle="Anexe um arquivo ou cole o texto do currículo/parecer">
      <div className="flex items-center justify-between gap-3 flex-wrap rounded-lg px-3 py-2 mb-4" style={{ backgroundColor: "#EAF4FF" }}>
        <span className="text-xs" style={{ color: AVLA_BLUE }}>Só para ver funcionando? Preencha com um candidato de exemplo.</span>
        <button onClick={carregarExemplo} disabled={!proximoExemplo}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border bg-white disabled:opacity-50"
          style={{ borderColor: AVLA_BLUE, color: AVLA_BLUE }}>
          <Sparkles size={13} /> {proximoExemplo ? `Carregar exemplo (${proximoExemplo.nome})` : "Exemplos já carregados"}
        </button>
      </div>
      <label className="block text-sm font-semibold mb-1.5">Nome do candidato</label>
      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: Marina Souza"
        className={`${TEXT_CLASS} mb-4`} style={{ borderColor: BORDER }} />

      <label className="block text-sm font-semibold mb-1.5">Arquivo (.pdf, .docx ou .txt)</label>
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg border bg-white" style={{ borderColor: BORDER }}>
          <Upload size={14} /> Escolher arquivo
        </button>
        <input ref={fileInputRef} type="file" accept=".pdf,.docx,.txt" onChange={handleArquivo} className="hidden" />
        {arquivoNome && <span className="text-xs flex items-center gap-1" style={{ color: MUTED }}><FileText size={12} /> {arquivoNome}</span>}
        {status === "lendo" && <span className="text-xs flex items-center gap-1" style={{ color: MUTED }}><Loader2 size={12} className="animate-spin" /> Lendo arquivo…</span>}
      </div>

      <label className="block text-sm font-semibold mb-1.5">Ou cole aqui o currículo / parecer</label>
      <textarea value={texto} onChange={(e) => { setTexto(e.target.value); setExemploChave(null); }} rows={8}
        placeholder="Cole o texto do currículo e/ou o parecer da entrevista do candidato..."
        className={`${TEXT_CLASS} font-mono`} style={{ borderColor: BORDER }} />

      {status === "erro" && (
        <p className="text-sm mt-2 flex items-start gap-1.5" style={{ color: "#B45309" }}><AlertTriangle size={14} className="mt-0.5 shrink-0" /> {erro}</p>
      )}

      <div className="flex gap-2 mt-4">
        <button onClick={handleAnalisar} disabled={status === "analisando" || status === "lendo"}
          className="flex items-center gap-2 font-semibold text-sm py-2.5 px-4 rounded-lg text-white disabled:opacity-50" style={{ backgroundColor: AVLA_BLUE }}>
          {status === "analisando" ? <><Loader2 size={15} className="animate-spin" /> Analisando com IA…</> : <><Bot size={15} /> Analisar com IA</>}
        </button>
        <button onClick={preencherManualmente} className="flex items-center gap-2 font-semibold text-sm py-2.5 px-4 rounded-lg border bg-white" style={{ borderColor: BORDER }}>
          <Pencil size={15} /> Preencher manualmente
        </button>
      </div>
    </Card>
  );
}

function RevisaoPerfil({ vaga, nome, setNome, perfil, setPerfil, erro, onConfirmar, onCancelar }) {
  const [aba, setAba] = useState("alinhamento");
  function toggleCompetencia(id) {
    setPerfil((p) => ({ ...p, competencias: { ...p.competencias, [id]: !p.competencias[id] } }));
  }
  return (
    <Card title="Revisar perfil antes de confirmar" subtitle="A IA sugeriu este perfil a partir do texto. Ajuste o que achar necessário — nada entra no ranking sem essa revisão.">
      {erro && (
        <div className="flex items-start gap-2 text-sm rounded-lg p-3 mb-4" style={{ backgroundColor: "#FFF3C4" }}>
          <AlertTriangle size={15} className="mt-0.5 shrink-0" /> {erro}
        </div>
      )}
      {perfil.confianca === "baixa" && (
        <div className="flex items-start gap-2 text-sm rounded-lg p-3 mb-4" style={{ backgroundColor: "#FFF3C4" }}>
          <AlertTriangle size={15} className="mt-0.5 shrink-0" /> O texto era curto ou vago — confira as estimativas com atenção redobrada.
        </div>
      )}
      {perfil.resumo && (
        <p className="text-sm italic mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: "#F0EEE7", color: "#4a4a4a" }}>“{perfil.resumo}”</p>
      )}

      <label className="block text-sm font-semibold mb-1.5">Nome do candidato</label>
      <input value={nome} onChange={(e) => setNome(e.target.value)} className={`${TEXT_CLASS} mb-4`} style={{ borderColor: BORDER }} />

      <SubTabs tabs={ABAS_PERFIL} active={aba} onChange={setAba} />

      {aba === "alinhamento" && (
        <div>
          <label className="block text-sm font-semibold mb-1.5">Senioridade estimada</label>
          <input type="range" min={1} max={5} step={1} value={perfil.senioridade}
            onChange={(e) => setPerfil((p) => ({ ...p, senioridade: Number(e.target.value) }))}
            className="w-full" style={{ accentColor: AVLA_BLUE }} />
          <p className="text-sm mt-2 mb-4 font-medium px-3 py-2 rounded-md" style={{ backgroundColor: "#EAF4FF", color: AVLA_BLUE }}>
            Nível {perfil.senioridade}: {SENIORITY_LABELS[perfil.senioridade]}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Anos de experiência</label>
              <input type="number" min={0} max={40} value={perfil.experienciaAnos}
                onChange={(e) => setPerfil((p) => ({ ...p, experienciaAnos: Math.max(0, Number(e.target.value) || 0) }))}
                className={SELECT_CLASS} style={{ borderColor: BORDER }} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Formação</label>
              <select value={perfil.formacaoNivel} onChange={(e) => setPerfil((p) => ({ ...p, formacaoNivel: Number(e.target.value) }))}
                className={SELECT_CLASS} style={{ borderColor: BORDER }}>
                {Object.entries(FORMACAO_NIVEIS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Área de formação</label>
              <select value={perfil.formacaoArea} onChange={(e) => setPerfil((p) => ({ ...p, formacaoArea: e.target.value }))}
                className={SELECT_CLASS} style={{ borderColor: BORDER }}>
                {FORMACAO_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>

          <label className="block text-sm font-semibold mb-2">Competências que o candidato possui (as definidas pelo gestor)</label>
          {vaga.competencias.length === 0 ? (
            <p className="text-sm" style={{ color: MUTED }}>O gestor não definiu competências para esta vaga.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {vaga.competencias.map((c) => (
                <button key={c.id} onClick={() => toggleCompetencia(c.id)} className="text-xs font-semibold px-2.5 py-1.5 rounded-md border"
                  style={{ borderColor: perfil.competencias[c.id] ? AVLA_BLUE : BORDER, backgroundColor: perfil.competencias[c.id] ? AVLA_BLUE : "white", color: perfil.competencias[c.id] ? "white" : "#4a4a4a" }}>
                  {perfil.competencias[c.id] ? "✓ " : ""}{c.nome}{c.nivel === "obrigatoria" ? " *" : ""}
                </button>
              ))}
            </div>
          )}
          {vaga.competencias.some((c) => c.nivel === "obrigatoria") && <p className="text-xs mt-2" style={{ color: MUTED }}>* competência obrigatória para a vaga</p>}
        </div>
      )}

      {aba === "comportamentos" && (
        <div>
          <label className="block text-sm font-semibold mb-2">Comportamentos evidenciados no texto (1 a 5)</label>
          {vaga.comportamentos.length === 0 ? (
            <p className="text-sm" style={{ color: MUTED }}>O gestor não definiu comportamentos para esta vaga.</p>
          ) : (
            <div className="space-y-3 mb-2">
              {vaga.comportamentos.map((b) => (
                <div key={b.id} className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-sm">{b.nome}</span>
                    {b.descricao && <span className="block text-xs" style={{ color: MUTED }}>{b.descricao}</span>}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} onClick={() => setPerfil((p) => ({ ...p, comportamentos: { ...p.comportamentos, [b.id]: n } }))}
                        className="w-7 h-7 rounded-md text-xs font-semibold border"
                        style={{ borderColor: perfil.comportamentos[b.id] === n ? EMERALD : BORDER, backgroundColor: perfil.comportamentos[b.id] === n ? EMERALD : "white", color: perfil.comportamentos[b.id] === n ? "white" : "#4a4a4a" }}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2 mt-6">
        <button onClick={onConfirmar} disabled={!nome.trim()} className="flex items-center gap-2 font-semibold text-sm py-2.5 px-4 rounded-lg text-white disabled:opacity-50" style={{ backgroundColor: AVLA_BLUE }}>
          <CheckCircle2 size={15} /> Confirmar e adicionar ao ranking
        </button>
        <button onClick={onCancelar} className="text-sm font-semibold py-2.5 px-4 rounded-lg border bg-white" style={{ borderColor: BORDER }}>Voltar</button>
      </div>
    </Card>
  );
}

// ============================================================
// ETAPA 3 — PAINEL DE FIT SCORE
// ============================================================
function PainelFitScore({ vaga, candidatos, contratadoId, onContratar }) {
  const ranked = candidatos.map((c) => ({ c, score: calcularFitScore(vaga, c) })).sort((a, b) => b.score.total - a.score.total);

  if (candidatos.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-sm" style={{ color: MUTED }}>Nenhum candidato adicionado ainda para esta vaga. Volte à etapa 2 para anexar um currículo ou parecer.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: MUTED }}>Vaga: {vaga.titulo}</p>
        <h2 className="text-xl font-bold">Ranking de aderência (Fit Score)</h2>
        <p className="text-sm mt-1" style={{ color: MUTED }}>
          Nota de 0 a 100. Alinhamento = competências 30% · experiência 20% · formação 10% · senioridade 15%. Comportamentos = 25%. Se a vaga não definiu competências ou comportamentos, os pesos são redistribuídos.
        </p>
      </div>

      <div className="space-y-3">
        {ranked.map(({ c, score }, i) => {
          const jaContratado = contratadoId === c.id;
          return (
            <div key={c.id} className="bg-white rounded-xl border p-5" style={{ borderColor: jaContratado ? EMERALD : BORDER }}>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center justify-center w-16 h-16 rounded-lg shrink-0" style={{ backgroundColor: i === 0 ? SUN_YELLOW : "#F0EEE7" }}>
                    {i === 0 && <Trophy size={16} className="mb-0.5" />}
                    <span className="text-xl font-black leading-none">{score.total}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-base">{c.nome}</span>
                      {jaContratado && <Pill tone="green">Contratado</Pill>}
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: MUTED }}>
                      {c.experienciaAnos} {c.experienciaAnos === 1 ? "ano" : "anos"} de experiência · {FORMACAO_NIVEIS[c.formacaoNivel]} ({c.formacaoArea})
                    </p>
                    {c.resumo && <p className="text-xs mt-1 italic" style={{ color: MUTED }}>“{c.resumo}”</p>}
                    <div className="mt-1 space-y-0.5">
                      {score.obrigFaltando.length > 0 && (
                        <p className="text-xs flex items-center gap-1" style={{ color: "#B45309" }}><Info size={12} /> Falta competência obrigatória: {score.obrigFaltando.join(", ")}</p>
                      )}
                      {score.expAbaixo && (
                        <p className="text-xs flex items-center gap-1" style={{ color: "#B45309" }}><Info size={12} /> Experiência abaixo do mínimo ({c.experienciaAnos} vs {vaga.experienciaAnos}+ anos)</p>
                      )}
                      {score.formacaoAbaixo && (
                        <p className="text-xs flex items-center gap-1" style={{ color: "#B45309" }}><Info size={12} /> Formação abaixo do mínimo ({FORMACAO_NIVEIS[c.formacaoNivel]})</p>
                      )}
                    </div>
                  </div>
                </div>
                {!contratadoId && (
                  <button onClick={() => onContratar(c.id)} className="text-sm font-semibold px-3 py-2 rounded-lg text-white whitespace-nowrap" style={{ backgroundColor: AVLA_BLUE }}>
                    Marcar como contratado
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="rounded-lg p-3" style={{ backgroundColor: "#F8F7F2" }}>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wide" style={{ color: MUTED }}>Alinhamento</span>
                    <span className="text-sm font-black">{score.alinhamento}</span>
                  </div>
                  {score.competencias !== null && <ProgressBar label="Competências" value={score.competencias} color={AVLA_BLUE} />}
                  <ProgressBar label="Experiência" value={score.experiencia} color={AVLA_BLUE} />
                  <ProgressBar label="Formação" value={score.formacao} color={AVLA_BLUE} />
                  <ProgressBar label="Senioridade" value={score.senioridade} color={AVLA_BLUE} />
                  {vaga.competencias.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {vaga.competencias.map((x) => {
                        const tem = !!c.competencias[x.id];
                        return (
                          <span key={x.id} className="text-xs px-2 py-0.5 rounded-md font-medium"
                            style={{ backgroundColor: tem ? "#E7F9F0" : "#F0EEE7", color: tem ? "#0A7A4B" : MUTED }}>
                            {tem ? "✓" : "✗"} {x.nome}{x.nivel === "obrigatoria" ? " *" : ""}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="rounded-lg p-3" style={{ backgroundColor: "#F8F7F2" }}>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wide" style={{ color: MUTED }}>Comportamentos</span>
                    <span className="text-sm font-black">{score.comportamentos ?? "—"}</span>
                  </div>
                  {vaga.comportamentos.length === 0 && <p className="text-xs" style={{ color: MUTED }}>A vaga não definiu comportamentos.</p>}
                  {vaga.comportamentos.map((b) => (
                    <ProgressBar key={b.id} label={`${b.nome} · prioridade ${WEIGHT_LABELS[b.peso].toLowerCase()}`} value={Math.round(((c.comportamentos[b.id] ?? 3) / 5) * 100)} color={EMERALD} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// ETAPA 4 — AVALIAÇÃO 90/180 DIAS + PARECER FINAL
// ============================================================
function AvaliacaoDesempenho({ vaga, candidato, fit, avaliacaoSalva, onSalvar }) {
  const entregaveisDefinidos = vaga.entregaveis.filter((e) => e.trim() !== "");
  const [aba, setAba] = useState("alinhamento");
  const [form, setForm] = useState(avaliacaoSalva || {
    periodo: "180",
    senioridadeReal: vaga.senioridade,
    comportamentosReal: Object.fromEntries(vaga.comportamentos.map((b) => [b.id, 3])),
    entregaveisStatus: entregaveisDefinidos.map(() => "parcial"),
    competenciasReal: Object.fromEntries(vaga.competencias.map((c) => [c.id, 3])),
    bagagem: "adequada",
  });

  const resultado = avaliacaoSalva ? calcularResultadoReal(vaga, avaliacaoSalva, fit) : null;
  const parecer = resultado ? gerarParecer(vaga, candidato, avaliacaoSalva, resultado, fit) : null;
  const exigido = `${vaga.experienciaAnos > 0 ? vaga.experienciaAnos + "+ anos de experiência" : "sem exigência de experiência"} · ${FORMACAO_NIVEIS[vaga.formacaoNivel]}`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-1">
            <SubTabs tabs={ABAS_PERFIL} active={aba} onChange={setAba} />
            <div className="inline-flex items-center gap-2 mb-5 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: MUTED }}>Marco:</span>
              {["90", "180"].map((p) => (
                <button key={p} onClick={() => setForm((f) => ({ ...f, periodo: p }))} className="text-xs font-semibold px-2.5 py-1.5 rounded-md border"
                  style={{ borderColor: form.periodo === p ? AVLA_BLUE : BORDER, backgroundColor: form.periodo === p ? AVLA_BLUE : "white", color: form.periodo === p ? "white" : "#4a4a4a" }}>
                  {p} dias
                </button>
              ))}
              <button onClick={() => setForm(avaliacaoDeExemplo(vaga))} title="Preenche a avaliação com valores de exemplo (depois é só salvar)"
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border bg-white ml-2" style={{ borderColor: AVLA_BLUE, color: AVLA_BLUE }}>
                <Sparkles size={13} /> Carregar exemplo
              </button>
            </div>
          </div>

          {aba === "alinhamento" && (
            <div className="space-y-6">
              {(vaga.descricao.trim() || vaga.atividades.trim()) && (
                <Card title="Lembrete da abertura da vaga" subtitle="O que foi escrito pelo gestor na abertura — use como referência ao avaliar">
                  {vaga.descricao.trim() && (
                    <div className="mb-3">
                      <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: MUTED }}>Descrição da vaga</p>
                      <p className="text-sm whitespace-pre-line">{vaga.descricao}</p>
                    </div>
                  )}
                  {vaga.atividades.trim() && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: MUTED }}>Descrição das atividades</p>
                      <p className="text-sm whitespace-pre-line">{vaga.atividades}</p>
                    </div>
                  )}
                </Card>
              )}

              <Card title={`Avaliação de ${candidato.nome}`} subtitle="Preenchida pelo mesmo gestor, nos mesmos critérios do formulário de abertura da vaga">
                <label className="block text-sm font-semibold mb-1.5">Autonomia real demonstrada</label>
                <input type="range" min={1} max={5} step={1} value={form.senioridadeReal}
                  onChange={(e) => setForm((f) => ({ ...f, senioridadeReal: Number(e.target.value) }))}
                  className="w-full" style={{ accentColor: AVLA_BLUE }} />
                <p className="text-sm mt-2 font-medium px-3 py-2 rounded-md" style={{ backgroundColor: "#EAF4FF", color: AVLA_BLUE }}>
                  Nível {form.senioridadeReal}: {SENIORITY_LABELS[form.senioridadeReal]} <span style={{ color: MUTED }}>(esperado: nível {vaga.senioridade})</span>
                </p>
              </Card>

              <Card title="Entregáveis dos 90 dias">
                <div className="space-y-2">
                  {entregaveisDefinidos.map((e, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b last:border-0 gap-3" style={{ borderColor: "#EFEBE3" }}>
                      <span className="text-sm">{e}</span>
                      <div className="flex gap-1.5 shrink-0">
                        {[{ v: "entregue", label: "Entregue", icon: CheckCircle2 }, { v: "parcial", label: "Parcial", icon: MinusCircle }, { v: "nao", label: "Não entregue", icon: Circle }].map((opt) => (
                          <button key={opt.v} onClick={() => setForm((f) => { const arr = [...f.entregaveisStatus]; arr[i] = opt.v; return { ...f, entregaveisStatus: arr }; })}
                            className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md border"
                            style={{ borderColor: form.entregaveisStatus[i] === opt.v ? AVLA_BLUE : BORDER, backgroundColor: form.entregaveisStatus[i] === opt.v ? AVLA_BLUE : "white", color: form.entregaveisStatus[i] === opt.v ? "white" : "#4a4a4a" }}>
                            <opt.icon size={12} /> {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  {entregaveisDefinidos.length === 0 && <p className="text-sm" style={{ color: MUTED }}>Nenhum entregável foi definido na abertura da vaga.</p>}
                </div>
              </Card>

              <Card title="Competências técnicas" subtitle="Domínio demonstrado em cada competência definida na abertura da vaga (1 a 5)">
                <div className="space-y-2.5">
                  {vaga.competencias.map((c) => (
                    <div key={c.id} className="flex items-center justify-between gap-3">
                      <div>
                        <span className="text-sm">{c.nome} <span className="text-xs" style={{ color: MUTED }}>({c.nivel === "obrigatoria" ? "obrigatória" : "desejável"})</span></span>
                        {c.detalhe && <span className="block text-xs" style={{ color: MUTED }}>{c.detalhe}</span>}
                      </div>
                      <div className="flex gap-1 shrink-0">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button key={n} onClick={() => setForm((f) => ({ ...f, competenciasReal: { ...f.competenciasReal, [c.id]: n } }))}
                            className="w-7 h-7 rounded-md text-xs font-semibold border"
                            style={{ borderColor: form.competenciasReal[c.id] === n ? AVLA_BLUE : BORDER, backgroundColor: form.competenciasReal[c.id] === n ? AVLA_BLUE : "white", color: form.competenciasReal[c.id] === n ? "white" : "#4a4a4a" }}>
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  {vaga.competencias.length === 0 && <p className="text-sm" style={{ color: MUTED }}>A vaga não definiu competências na abertura.</p>}
                </div>
              </Card>

              <Card title="Experiência e formação" subtitle={`Pedido na vaga: ${exigido}`}>
                <label className="block text-sm font-semibold mb-2">Frente ao que a função exigiu, a bagagem da pessoa foi:</label>
                <div className="flex flex-wrap gap-2">
                  {[{ v: "abaixo", label: "Abaixo do necessário" }, { v: "adequada", label: "Adequada" }, { v: "acima", label: "Acima do necessário" }].map((o) => (
                    <button key={o.v} onClick={() => setForm((f) => ({ ...f, bagagem: o.v }))} className="text-sm font-semibold px-3 py-2 rounded-lg border"
                      style={{ borderColor: form.bagagem === o.v ? AVLA_BLUE : BORDER, backgroundColor: form.bagagem === o.v ? AVLA_BLUE : "white", color: form.bagagem === o.v ? "white" : "#4a4a4a" }}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </Card>

              <button onClick={() => setAba("comportamentos")} className="flex items-center gap-2 font-semibold text-sm py-2.5 px-4 rounded-lg border bg-white" style={{ borderColor: BORDER, color: AVLA_BLUE }}>
                Próximo: Comportamentos <ArrowRight size={15} />
              </button>
            </div>
          )}

          {aba === "comportamentos" && (
            <div className="space-y-6">
              <Card title="Comportamentos observados" subtitle="Nota de 1 a 5 em cada comportamento definido na abertura da vaga">
                <div className="space-y-3">
                  {vaga.comportamentos.map((b) => (
                    <div key={b.id} className="flex items-center justify-between gap-3">
                      <div>
                        <span className="text-sm">{b.nome} <span className="text-xs" style={{ color: MUTED }}>(prioridade {WEIGHT_LABELS[b.peso].toLowerCase()})</span></span>
                        {b.descricao && <span className="block text-xs" style={{ color: MUTED }}>{b.descricao}</span>}
                      </div>
                      <div className="flex gap-1 shrink-0">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button key={n} onClick={() => setForm((f) => ({ ...f, comportamentosReal: { ...f.comportamentosReal, [b.id]: n } }))}
                            className="w-7 h-7 rounded-md text-xs font-semibold border"
                            style={{ borderColor: form.comportamentosReal[b.id] === n ? EMERALD : BORDER, backgroundColor: form.comportamentosReal[b.id] === n ? EMERALD : "white", color: form.comportamentosReal[b.id] === n ? "white" : "#4a4a4a" }}>
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  {vaga.comportamentos.length === 0 && <p className="text-sm" style={{ color: MUTED }}>A vaga não definiu comportamentos na abertura.</p>}
                </div>
              </Card>
              <button onClick={() => setAba("alinhamento")} className="flex items-center gap-2 font-semibold text-sm py-2.5 px-4 rounded-lg border bg-white" style={{ borderColor: BORDER, color: AVLA_BLUE }}>
                <ArrowLeft size={15} /> Voltar ao alinhamento
              </button>
            </div>
          )}

          <button onClick={() => onSalvar(form)} className="w-full mt-6 font-semibold text-sm py-3 rounded-lg text-white" style={{ backgroundColor: AVLA_BLUE }}>
            {avaliacaoSalva ? "Atualizar avaliação e parecer" : "Salvar avaliação e gerar parecer"}
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <Card title="Fechando o loop">
              <div className="flex items-center justify-between mb-4">
                <div className="text-center flex-1">
                  <p className="text-xs" style={{ color: MUTED }}>Fit Score previsto</p>
                  <p className="text-3xl font-black">{fit.total}</p>
                </div>
                <ArrowRight size={18} style={{ color: MUTED }} />
                <div className="text-center flex-1">
                  <p className="text-xs" style={{ color: MUTED }}>Resultado real</p>
                  <p className="text-3xl font-black">{resultado ? resultado.notaReal : "—"}</p>
                </div>
              </div>
              {resultado ? (
                <>
                  <p className="text-sm font-semibold mb-3 flex items-center gap-1.5">
                    {resultado.gap > 5 ? <TrendingUp size={15} /> : resultado.gap < -5 ? <TrendingDown size={15} /> : <Minus size={15} />}
                    Gap de calibração: {resultado.gap > 0 ? "+" : ""}{resultado.gap}
                  </p>
                  {resultado.comps.filter((c) => c.valor !== null).map((c) => (
                    <ProgressBar key={c.key} label={c.label} value={c.valor} color={c.key === "comportamentos" ? EMERALD : AVLA_BLUE} />
                  ))}
                  <p className="text-xs mt-3" style={{ color: MUTED }}>O parecer completo está logo abaixo.</p>
                </>
              ) : (
                <p className="text-sm" style={{ color: MUTED }}>Preencha as duas abas e salve para ver o resultado comparado ao Fit Score e o parecer final.</p>
              )}
            </Card>
          </div>
        </div>
      </div>

      {parecer && <ParecerFinal parecer={parecer} resultado={resultado} periodo={avaliacaoSalva.periodo} />}
    </div>
  );
}

function ParecerFinal({ parecer, resultado, periodo }) {
  const estilos = {
    atende: { bg: "#E7F9F0", borda: EMERALD, label: "Está atendendo ao alinhamento", icon: CheckCircle2, cor: "#0A7A4B" },
    parcial: { bg: "#FFF3C4", borda: SUN_YELLOW, label: "Está atendendo parcialmente", icon: AlertTriangle, cor: "#8A6D00" },
    nao: { bg: RED_BG, borda: RED_BAR, label: "Não está atendendo ao alinhamento", icon: XCircle, cor: RED_TXT },
  };
  const statusCor = { atende: EMERALD, parcial: SUN_YELLOW, nao: RED_BAR };
  const statusLabel = { atende: "Atende", parcial: "Parcial", nao: "Não atende" };
  const prioridadeEstilo = {
    alta: { bg: RED_BG, cor: RED_TXT, label: "Prioridade alta" },
    "média": { bg: "#FFF3C4", cor: "#8A6D00", label: "Prioridade média" },
    baixa: { bg: "#E7F9F0", cor: "#0A7A4B", label: "Prioridade baixa" },
  };
  const e = estilos[parecer.veredito];
  const Icone = e.icon;

  return (
    <div className="bg-white rounded-xl border p-6" style={{ borderColor: BORDER }}>
      <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: MUTED }}>Parecer final · avaliação de {periodo} dias</p>
      <div className="rounded-xl p-4 mb-5 flex items-start gap-3" style={{ backgroundColor: e.bg, border: `1px solid ${e.borda}` }}>
        <Icone size={26} style={{ color: e.cor }} className="shrink-0 mt-0.5" />
        <div>
          <p className="text-lg font-black" style={{ color: e.cor }}>{e.label}</p>
          <p className="text-sm mt-1" style={{ color: "#1a1a1a" }}>{parecer.narrativa}</p>
        </div>
      </div>

      <h4 className="font-bold text-sm mb-3">Como cada dimensão do alinhamento se saiu</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mb-6">
        {resultado.comps.filter((c) => c.valor !== null).map((c) => {
          const st = statusDe(c.valor);
          return (
            <div key={c.key} className="mb-3">
              <div className="flex justify-between items-center text-sm mb-1">
                <span>{c.label}</span>
                <span className="text-xs font-bold" style={{ color: st === "atende" ? "#0A7A4B" : st === "parcial" ? "#8A6D00" : RED_TXT }}>
                  {statusLabel[st]} · {c.valor}%
                </span>
              </div>
              <div className="h-2 rounded-full" style={{ backgroundColor: "#EDEAE2" }}>
                <div className="h-2 rounded-full" style={{ width: `${c.valor}%`, backgroundColor: statusCor[st] }} />
              </div>
            </div>
          );
        })}
      </div>

      <h4 className="font-bold text-sm mb-3">Recomendações</h4>
      <div className="space-y-3">
        {parecer.recs.map((r, i) => {
          const p = prioridadeEstilo[r.prioridade];
          return (
            <div key={i} className="rounded-lg border p-4 flex items-start gap-3" style={{ borderColor: BORDER }}>
              <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: "#EAF4FF", color: AVLA_BLUE }}>
                <r.icon size={16} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-bold text-sm">{r.titulo}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md" style={{ backgroundColor: p.bg, color: p.cor }}>{p.label}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md" style={{ backgroundColor: "#F0EEE7", color: "#4a4a4a" }}>{r.tipo}</span>
                </div>
                <p className="text-sm" style={{ color: "#4a4a4a" }}>{r.texto}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

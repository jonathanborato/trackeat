'use client';

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Bike, Map, Settings, Users, CreditCard, ListChecks, Plus, Save, Play, Pause, AlertCircle, Search, Filter, ChevronRight } from "lucide-react";

export default function AdminTrackEat() {
  const [tab, setTab] = useState("mapa");
  const [queueRunning, setQueueRunning] = useState(true);
  const [filter, setFilter] = useState("");

  const drivers = useMemo(() => ([
    { id: "DRV-001", nome: "João Silva", status: "Livre", placa: "ABC1D23", tel: "(41) 9 9999-9999", ultimoCheckin: "18:02", zonas: ["Centro", "Água Verde"], mensalidadePaga: true },
    { id: "DRV-002", nome: "Maria Souza", status: "Em rota", placa: "BCD2E34", tel: "(41) 9 8888-8888", ultimoCheckin: "17:55", zonas: ["Batel"], mensalidadePaga: false },
    { id: "DRV-003", nome: "Carlos Lima", status: "Livre", placa: "CDE3F45", tel: "(41) 9 7777-7777", ultimoCheckin: "17:40", zonas: ["Centro"], mensalidadePaga: true },
  ]), []);

  const deliveries = useMemo(() => ([
    { id: "PED-15872", cliente: "Ana P.", endereco: "Rua X, 123", zona: "Centro", valor: 64.90, sla: "20 min", prioridade: 2, status: "Pendente" },
    { id: "PED-15873", cliente: "Marcos T.", endereco: "Av. Y, 890", zona: "Água Verde", valor: 82.40, sla: "18 min", prioridade: 1, status: "Pendente" },
    { id: "PED-15874", cliente: "Cláudia R.", endereco: "Rua das Palmeiras, 250", zona: "Batel", valor: 49.00, sla: "25 min", prioridade: 3, status: "Pendente" },
  ]), []);

  const invoices = useMemo(() => ([
    { id: "FAT-2025-07-001", referencia: "Jul/2025", valor: 349.00, status: "Pago", vencimento: "2025-07-10" },
    { id: "FAT-2025-08-001", referencia: "Ago/2025", valor: 349.00, status: "Em aberto", vencimento: "2025-08-10" },
  ]), []);

  const filteredDrivers = useMemo(() => drivers.filter(d => d.nome.toLowerCase().includes(filter.toLowerCase()) || d.id.toLowerCase().includes(filter.toLowerCase())), [drivers, filter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Topbar />
      <div className="mx-auto max-w-[1200px] px-4 pb-24">
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-4">
          <Sidebar tab={tab} onChange={setTab} />
          <main>
            {tab === "mapa" && <MapaView deliveries={deliveries} queueRunning={queueRunning} setQueueRunning={setQueueRunning} />}
            {tab === "entregadores" && <EntregadoresView drivers={filteredDrivers} filter={filter} setFilter={setFilter} />}
            {tab === "entregas" && <EntregasView deliveries={deliveries} />}
            {tab === "config" && <ConfigView />}
            {tab === "financeiro" && <FinanceiroView invoices={invoices} />}
            {tab === "fila" && <FilaView drivers={drivers} deliveries={deliveries} />}
          </main>
        </div>
      </div>
    </div>
  );
}

function Topbar(){
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur bg-slate-900/70">
      <div className="mx-auto max-w-[1200px] h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={28} />
          <span className="font-extrabold tracking-wide">TrackEat Admin</span>
          <span className="text-xs text-slate-400 border border-white/10 rounded-full px-2 py-1 ml-2">v0.1</span>
        </div>
        <div className="flex items-center gap-2">
          <a className="px-3 py-2 text-sm rounded-lg border border-white/10 hover:bg-white/5" href="#guia">Guia</a>
          <a className="px-3 py-2 text-sm rounded-lg bg-gradient-to-r from-rose-500 to-orange-500 text-slate-900 font-bold" href="https://wa.me/5541995629072" target="_blank" rel="noopener">Suporte</a>
        </div>
      </div>
    </header>
  );
}

function Sidebar({tab, onChange}:{tab:string; onChange:(t:string)=>void}){
  const items = [
    { id: "mapa", label: "Mapa & Painel", icon: Map },
    { id: "entregadores", label: "Entregadores", icon: Users },
    { id: "entregas", label: "Entregas", icon: ListChecks },
    { id: "fila", label: "Fila", icon: Bike },
    { id: "financeiro", label: "Financeiro", icon: CreditCard },
    { id: "config", label: "Configurações", icon: Settings },
  ];
  return (
    <aside className="rounded-2xl border border-white/10 bg-white/5 p-2">
      {items.map(({id,label,icon:Icon}) => (
        <button key={id} onClick={()=>onChange(id)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-white/10 ${tab===id?"bg-white/10 border border-white/15":""}`}>
          <Icon className="w-4 h-4"/><span className="text-sm">{label}</span>
        </button>
      ))}
    </aside>
  );
}

function MapaView({deliveries, queueRunning, setQueueRunning}:{deliveries:any[]; queueRunning:boolean; setQueueRunning:(v:boolean)=>void}){
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">Mapa em tempo real</h2>
          <div className="flex items-center gap-2">
            <button onClick={()=>setQueueRunning(!queueRunning)} className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/10 flex items-center gap-2">
              {queueRunning ? <Pause className="w-4 h-4"/> : <Play className="w-4 h-4"/>}
              <span className="text-sm">{queueRunning?"Pausar Fila":"Retomar Fila"}</span>
            </button>
            <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-orange-500 text-slate-900 font-bold flex items-center gap-2"><Plus className="w-4 h-4"/> Nova Entrega</button>
          </div>
        </div>
        <div className="aspect-[16/9] w-full rounded-xl border border-white/10 overflow-hidden relative">
          {/* Placeholder do mapa: substitua por componente do Mapbox/Google */}
          <div className="absolute inset-0 bg-[url('https://tile.openstreetmap.org/10/292/511.png')] bg-cover opacity-10" />
          <div className="p-4 relative">
            <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-3 py-1 text-xs">3 entregas pendentes</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Entregas pendentes">
          <div className="divide-y divide-white/10">
            {deliveries.map((d)=> (
              <div key={d.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{d.id} · {d.cliente}</div>
                  <div className="text-xs text-slate-400">{d.endereco} · {d.zona}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">ETA {d.sla}</div>
                  <div className="text-xs text-slate-400">Prioridade {d.prioridade}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Ações rápidas">
          <div className="grid grid-cols-2 gap-2">
            <QuickButton label="Despachar melhor rota" icon={ChevronRight} />
            <QuickButton label="Agrupar pedidos" icon={ListChecks} />
            <QuickButton label="Chamar motoboy mais próximo" icon={Bike} />
            <QuickButton label="Salvar parâmetros" icon={Save} />
          </div>
        </Card>
      </div>
    </section>
  );
}

function EntregadoresView({drivers, filter, setFilter}:{drivers:any[]; filter:string; setFilter:(v:string)=>void}){
  return (
    <section className="space-y-4">
      <HeaderRow title="Entregadores" action={<button className="px-3 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-orange-500 text-slate-900 font-bold flex items-center gap-2"><Plus className="w-4 h-4"/> Cadastrar</button>} />

      <div className="rounded-2xl border border-white/10 bg-white/5 p-3 flex items-center gap-2">
        <Search className="w-4 h-4 text-slate-400"/>
        <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Buscar por nome ou ID" className="bg-transparent outline-none w-full text-sm"/>
        <button className="px-3 py-1 text-xs rounded-lg border border-white/10"><Filter className="w-3 h-3 inline mr-1"/>Filtros</button>
      </div>

      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr className="text-left">
              <Th>ID</Th><Th>Nome</Th><Th>Status</Th><Th>Placa</Th><Th>Áreas</Th><Th>Últ. check-in</Th><Th>Mensalidade</Th>
            </tr>
          </thead>
          <tbody>
            {drivers.map(d => (
              <tr key={d.id} className="border-t border-white/10">
                <Td>{d.id}</Td>
                <Td className="font-medium">{d.nome}</Td>
                <Td><Badge color={d.status==="Livre"?"emerald":"sky"}>{d.status}</Badge></Td>
                <Td>{d.placa}</Td>
                <Td className="text-slate-400">{d.zonas.join(", ")}</Td>
                <Td>{d.ultimoCheckin}</Td>
                <Td>
                  <Badge color={d.mensalidadePaga?"emerald":"rose"}>{d.mensalidadePaga?"Paga":"Em aberto"}</Badge>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function EntregasView({deliveries}:{deliveries:any[]}){
  return (
    <section className="space-y-4">
      <HeaderRow title="Entregas" action={<button className="px-3 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-orange-500 text-slate-900 font-bold flex items-center gap-2"><Plus className="w-4 h-4"/> Nova Entrega</button>} />
      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr className="text-left">
              <Th>ID</Th><Th>Cliente</Th><Th>Endereço</Th><Th>Zona</Th><Th>Valor</Th><Th>Prioridade</Th><Th>SLA</Th><Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map(d => (
              <tr key={d.id} className="border-t border-white/10">
                <Td>{d.id}</Td>
                <Td>{d.cliente}</Td>
                <Td className="text-slate-400">{d.endereco}</Td>
                <Td>{d.zona}</Td>
                <Td>R$ {d.valor.toFixed(2)}</Td>
                <Td>{d.prioridade}</Td>
                <Td>{d.sla}</Td>
                <Td><Badge color={d.status==="Pendente"?"amber":"emerald"}>{d.status}</Badge></Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function FinanceiroView({invoices}:{invoices:any[]}){
  return (
    <section className="space-y-4">
      <HeaderRow title="Financeiro" subtitle="Mensalidades pagas e a pagar" />
      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr className="text-left"><Th>ID</Th><Th>Referência</Th><Th>Vencimento</Th><Th>Valor</Th><Th>Status</Th></tr>
          </thead>
          <tbody>
            {invoices.map(f => (
              <tr key={f.id} className="border-t border-white/10">
                <Td>{f.id}</Td>
                <Td>{f.referencia}</Td>
                <Td>{f.vencimento}</Td>
                <Td>R$ {f.valor.toFixed(2)}</Td>
                <Td><Badge color={f.status==="Pago"?"emerald":"rose"}>{f.status}</Badge></Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ConfigView(){
  return (
    <section className="space-y-4">
      <HeaderRow title="Configurações de Rota" subtitle="Parametrize a roteirização conforme sua operação" />
      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Parâmetros gerais">
          <FormRow label="Capacidade por saída (pedidos por motoboy)"><input type="number" min={1} defaultValue={2} className="input"/></FormRow>
          <FormRow label="Peso do trânsito em tempo real"><input type="range" min={0} max={100} defaultValue={60} className="w-full"/></FormRow>
          <FormRow label="Tempo máximo de espera na loja (min)"><input type="number" min={0} defaultValue={8} className="input"/></FormRow>
          <FormRow label="Janela de SLA padrão (min)"><input type="number" min={10} defaultValue={30} className="input"/></FormRow>
          <div className="pt-2 flex gap-2">
            <button className="btn-primary">Salvar</button>
            <button className="btn-outline">Restaurar padrão</button>
          </div>
        </Card>
        <Card title="Zonas e prioridades">
          <FormRow label="Zonas ativas"><input placeholder="Ex.: Centro, Água Verde, Batel" className="input" defaultValue="Centro, Água Verde, Batel"/></FormRow>
          <FormRow label="Ordem de prioridade de zonas"><input className="input" defaultValue="Água Verde, Centro, Batel"/></FormRow>
          <FormRow label="Evitar vias"><input className="input" placeholder="Ex.: Av. congestionada"/></FormRow>
          <div className="pt-2 flex gap-2">
            <button className="btn-primary">Salvar</button>
            <button className="btn-outline">Importar CSV</button>
          </div>
        </Card>
      </div>
      <Alert text="Estas configurações impactam a fila de entregadores e o cálculo de agrupamento."/>
    </section>
  );
}

function FilaView({drivers, deliveries}:{drivers:any[]; deliveries:any[]}){
  return (
    <section className="space-y-4">
      <HeaderRow title="Fila de Entregadores" subtitle="Quem está no topo, qual rota pegou e há quanto tempo" />
      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr className="text-left"><Th>#</Th><Th>Entregador</Th><Th>Status</Th><Th>Últ. Saída</Th><Th>Pedidos</Th><Th>Zona</Th></tr>
          </thead>
          <tbody>
            {drivers.map((d, idx) => (
              <tr key={d.id} className="border-t border-white/10">
                <Td>{idx+1}</Td>
                <Td className="font-medium">{d.nome}</Td>
                <Td><Badge color={d.status==="Livre"?"emerald":"sky"}>{d.status}</Badge></Td>
                <Td>{d.ultimoCheckin}</Td>
                <Td>{d.status==="Em rota"?2:0}</Td>
                <Td>{d.zonas[0]}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ==== UI helpers ==== */
function Logo({size=24}:{size?:number}){
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ff4d4f"/><stop offset="1" stopColor="#ff8a00"/></linearGradient>
      </defs>
      <path d="M80 12c33 0 60 27 60 60 0 43-60 108-60 108S20 115 20 72c0-33 27-60 60-60z" fill="url(#g)"/>
      <circle cx="80" cy="72" r="18" fill="#fff"/>
    </svg>
  );
}

function HeaderRow({title, subtitle, action}:{title:string; subtitle?:string; action?:React.ReactNode}){
  return (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-lg font-bold">{title}</h2>
        {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function Card({title, children}:{title:string; children:React.ReactNode}){
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="font-semibold mb-2">{title}</div>
      {children}
    </div>
  );
}

function QuickButton({label, icon:Icon}:{label:string; icon:any}){
  return (
    <button className="px-3 py-2 rounded-xl border border-white/10 hover:bg-white/10 text-left flex items-center gap-2">
      <Icon className="w-4 h-4"/><span className="text-sm">{label}</span>
    </button>
  );
}

function Badge({children, color}:{children:React.ReactNode; color: "emerald"|"sky"|"rose"|"amber"}){
  const map:any = {
    emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    sky: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    rose: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    amber: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-lg border text-xs ${map[color]}`}>{children}</span>;
}

function Th({children}:{children:React.ReactNode}){return <th className="px-3 py-2 text-xs text-slate-400 uppercase tracking-wide">{children}</th>}
function Td({children, className=""}:{children:React.ReactNode; className?:string}){return <td className={`px-3 py-2 ${className}`}>{children}</td>}
function FormRow({label, children}:{label:string; children:React.ReactNode}){
  return (
    <label className="block mb-3">
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      {children}
    </label>
  );
}

function Alert({text}:{text:string}){
  return (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-200 text-sm px-3 py-2 flex items-center gap-2">
      <AlertCircle className="w-4 h-4"/><span>{text}</span>
    </div>
  );
}

type RequestData = Record<string, string>;
function nowInSaoPaulo(){const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date());const v=Object.fromEntries(parts.map(x=>[x.type,x.value]));return {date:`${v.year}-${v.month}-${v.day}`,time:`${v.hour}:${v.minute}`};}
export function buildMessage(d:RequestData){return [`Olá, Sabrine! Gostaria de ${d.mode==='agendamento'?'solicitar um agendamento':'pedir um orçamento'}.`,'',`Nome: ${d.name.trim()}`,`Telefone: ${d.phone.trim()}`,`Serviço desejado: ${d.service.trim()}`,`Dia desejado: ${d.date?d.date.split('-').reverse().join('/'):'A combinar'}`,`Horário desejado: ${d.time||'A combinar'}`,`Local: ${d.place}`,d.place==='Em meu domicílio'?`Endereço: ${d.address.trim()}`:'',d.notes.trim()?`Observações: ${d.notes.trim()}`:'','','Aguardo sua resposta para confirmar disponibilidade, valor e detalhes do atendimento.'].join('\n').replace(/\n{3,}/g,'\n\n');}
/** Bind the uncontrolled form, with cleanup for React remounts. */
export function setupBooking(root:HTMLElement){
 const controller=new AbortController();const opts={signal:controller.signal};
 const form=root.querySelector<HTMLFormElement>('#booking-form')!;
 const dialog=root.querySelector<HTMLDialogElement>('#review')!;
 const error=root.querySelector<HTMLElement>('#error')!;
 const input=(name:string)=>form.elements.namedItem(name) as HTMLInputElement;
 const value=(name:string)=>(form.elements.namedItem(name) as HTMLInputElement|RadioNodeList).value;
 input('date').min=nowInSaoPaulo().date;
 const sync=()=>{const booking=value('mode')==='agendamento';input('date').required=booking;input('time').required=booking;root.querySelector('#date-label')!.textContent=booking?'Dia desejado':'Dia desejado (opcional)';root.querySelector('#time-label')!.textContent=booking?'Horário desejado':'Horário desejado (opcional)';const home=value('place')==='Em meu domicílio';root.querySelector<HTMLElement>('#address-field')!.hidden=!home;input('address').required=home;};
 form.addEventListener('change',sync,opts);sync();
 form.addEventListener('submit',event=>{event.preventDefault();error.textContent='';const d=Object.fromEntries(new FormData(form)) as RequestData;if(!d.name.trim()||d.service.trim().length<5){error.textContent='Preencha seu nome e descreva o serviço desejado.';return;}let digits=d.phone.replace(/\D/g,'');if(digits.startsWith('55')&&digits.length>11)digits=digits.slice(2);if(!/^[1-9]{2}\d{8,9}$/.test(digits)){error.textContent='Informe um telefone válido com DDD, com 10 ou 11 dígitos.';input('phone').focus();return;}const now=nowInSaoPaulo();input('date').min=now.date;if(d.date&&(d.date<now.date||(d.date===now.date&&d.time&&d.time<=now.time))){error.textContent='Escolha um dia e horário futuros.';input('date').focus();return;}if(d.place==='Em meu domicílio'&&!d.address.trim()){error.textContent='Informe o endereço para consultar o atendimento em domicílio.';return;}const message=buildMessage(d);root.querySelector('#message')!.textContent=message;root.querySelector<HTMLAnchorElement>('#send')!.href='https://wa.me/5518997623184?text='+encodeURIComponent(message);dialog.showModal();},opts);
 root.querySelectorAll('.close,.edit').forEach(button=>button.addEventListener('click',()=>dialog.close(),opts));
 return ()=>{controller.abort();if(dialog.open)dialog.close();};
}

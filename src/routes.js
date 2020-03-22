import MainPanel from './befekt/MainPanel.vue';
import AlapAdatok from './befekt/AlapAdatok.vue';
import Szamlavezetok from './befekt/Szamlavezetok.vue';
import DomainCsoportok from './befekt/DomainCsoportok.vue';
import Devizanemek from './befekt/Devizanemek.vue';
import Befektetesek from './befekt/Befektetesek.vue';
import EredetiPelda from './befekt/EredetiPelda.vue';

export const routes = [
    {path: '', component: MainPanel},
    {path: '/alapadatok/domaincsoportok', component: DomainCsoportok},
    {path: '/alapadatok/szamlavezetok', component: Szamlavezetok},
    {path: '/alapadatok/devizanemek', component: Devizanemek},
    {path: '/alapadatok', component: AlapAdatok},
    {path: '/alapadatok/befektetesek', component: Befektetesek},
    {path: '/alapadatok/eredetipelda', component: EredetiPelda}
];
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/md-dark-deeppurple/theme.css";

import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import DynamicDialog from 'primevue/dynamicdialog';
import Fieldset from 'primevue/fieldset';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import InputSwitch from 'primevue/inputswitch';
import Menu from 'primevue/menu';
import Menubar from 'primevue/menubar';
import MultiSelect from 'primevue/multiselect';
import ProgressSpinner from 'primevue/progressspinner';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import Tag from 'primevue/tag';
import TieredMenu from 'primevue/tieredmenu';
import Toast from 'primevue/toast';
import Toolbar from 'primevue/toolbar';
import FileUpload from 'primevue/fileupload';
import Badge from 'primevue/badge';
import ConfirmDialog from 'primevue/confirmdialog';
import Divider from 'primevue/divider';
import Chips from 'primevue/chips';

import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

export const primevue = {
  install(app : any) {
    app.component('Button',Button);
    app.component('TieredMenu',TieredMenu);
    app.component('InputText',InputText);
    app.component('InputNumber',InputNumber);
    app.component('Card',Card);
    app.component('Fieldset',Fieldset);
    app.component('Menubar',Menubar);
    app.component('DataTable',DataTable);
    app.component('Column',Column);
    app.component('Toolbar',Toolbar);
    app.component('Calendar',Calendar);
    app.component('InputMask',InputMask);
    app.component('Dropdown',Dropdown);
    app.component('Dialog',Dialog);
    app.component('ProgressSpinner',ProgressSpinner);
    app.component('Toast',Toast);
    app.component('DynamicDialog',DynamicDialog);
    app.component('MultiSelect',MultiSelect);
    app.component('TabView',TabView);
    app.component('TabPanel',TabPanel);
    app.component('Tag',Tag);
    app.component('Menu',Menu);
    app.component('InputSwitch',InputSwitch);
    app.component('FileUpload',FileUpload);
    app.component('Badge',Badge);
    app.component('ConfirmDialog',ConfirmDialog);
    app.component('Divider',Divider);
    app.component('Chips',Chips); 

    app.use(ToastService)
    app.use(DialogService);
    app.use(ConfirmationService)
  }
}
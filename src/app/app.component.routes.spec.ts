import { appRoutes } from './app.module'
import { AddKilometersComponent } from './kilometers/add-kilometers.component'
xdescribe ('routes',()=>{
    it('it should contain component for kilometers', ()=>{
        expect(appRoutes).toContain({ path: 'kilometers', component: AddKilometersComponent})
    })
})
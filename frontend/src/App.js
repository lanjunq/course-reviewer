
import './App.css';
import { Layout, Menu} from 'antd';

import Main from '../src/Component/Main.js'


const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

function App() {
  return (
    <div>
      
        
        <div class = "header">

          Review Hub - A tool for UPenn students to review past student's comments on CIS&CIT courses
        </div>

      <Main></Main>
      <div class = "footer">©2021 Created by Lanjun Qi & Qianfan Guo</div> 
    

    </div>
  );
}

export default App;

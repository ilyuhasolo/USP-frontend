import {Link} from "../../components";
import SearchHandler from "../../components/search/SearchHandler"

export default function ChooseToSearch(){
    return (<>
        <SearchHandler />
    </>);
}

// <div className="header"><h1>Что ищем?</h1></div>
// <div className="choosing">
//     <Link className="but-st butt" href="/search/team">Команду</Link>
//     <Link className="but-st butt" href="">Куратора</Link>
//     <Link className="but-st butt" href="">Работодателя</Link>
//     <style>{".header{background: #F0F0F0; height: 80px;} .header h1{position:relative; top:15%; left: 2%} .choosing{position:relative; margin-top: 3%; margin-left: 1%} .but-st{position: relative; margin-right: 20px; font-weight:400;color:#212529;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:transparent;border:1px solid transparent;padding:.750rem .750rem;font-size:1rem;line-height:1.5;border-radius:.25rem;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out} .but-st:hover{color:#212529;text-decoration:none} .butt{position:relative; color:#fff;background-color:#007bff;border-color:#007bff} .butt:hover{color:#fff;background-color:#0069d9;border-color:#0062cc}"}</style>
// </div>
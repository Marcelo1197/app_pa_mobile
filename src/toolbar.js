const { createElement} = React;
const html = htm.bind(createElement);

class Toolbar extends React.Component {
    constructor (props) {
        super(props);
        this.state =  { titulo: props.titulo }; //le paso el titulo del toolbar por props desde el componente que lo usa
    }

    render() {
        return html`
        <${Ons.Toolbar}
            style=${{ backgroundColor: "gray" }}
        >
            <img src="/img/logo.png" style=${{marginTop:"5px", paddingLeft:"5px"}}  height="30" alt=""></img>
            <div className='center'>${this.state.titulo }</div> <!--TODO: alienear titulo-->
        <//>
        `;
    }
}

export default Toolbar;

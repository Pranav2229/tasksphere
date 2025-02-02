
import {
    Button,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    FormGroup,
    Form,
    Input,
    InputGroupText,
    InputGroup,
    Media,
    Navbar,
    Nav,
    Container,
} from "reactstrap";


export const Editpopup = () => {

    return (
        <>
            <div id="popup2" class="popup-container popup-style-2">
                <div class="popup-content">
                    <a href="#" class="close">&times;</a>
                    <h3>If you want support from our team please fill the below details..</h3>
                    {/* <div>
                        <div className="flex">
                            <input type="radio" name='support' onChange={() => { setdemovalues('alldemo'); setpagessupport(''); seterrorsupport(''); setnoneofthem('') }} />
                            <span>Do you want demo of all tasksphere ?</span>
                        </div>
                        <div className="flex">
                            <input type="radio" name='support' onChange={() => { setpagessupport('pagessupport'); seterrorsupport(''); setnoneofthem('') }} />
                            <span>Do you want support for other pages ?</span>
                        </div>
                        {pagessupport == 'pagessupport' && (
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                >
                                    Enter pages names
                                </label>
                                <Input
                                    className="form-control-alternative"
                                    id="input-username"
                                    placeholder="pages names"
                                    type="text"
                                    value={pagesdeatils}
                                    onChange={(e) => setpagesdeatils(e.target.value)}
                                />
                            </FormGroup>
                        )}
                        <div className="flex">
                            <input type="radio" name='support' onChange={() => { seterrorsupport('errorsupport'); setpagessupport(''); setnoneofthem('') }} />
                            <span>faceing some error while using application?</span>
                        </div>
                        {errorsupport == 'errorsupport' && (
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                >
                                    Upload screenshot image of error
                                </label>
                                <Input
                                    className="form-control-alternative"
                                    type="file"
                                    accept="image/*"
                                    onChange={handlefileupload}
                                />
                            </FormGroup>
                        )}
                        <div className="flex">
                            <input type="radio" name='support' onChange={() => { setnoneofthem('noneofthem'); seterrorsupport(''); setpagessupport('') }} />
                            <span>none of them</span>
                        </div>
                        {noneofthem == 'noneofthem' && (
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                >
                                    Enter other support rather then above ones..
                                </label>
                                <Input
                                    className="form-control-alternative"
                                    id="input-username"
                                    placeholder="pages names"
                                    type="text"
                                    value={othersupport}
                                    onChange={(e) => setothersupport(e.target.value)}
                                />
                            </FormGroup>
                        )}
                        <div className="col" style={{ textAlign: 'center' }}>
                            <Button
                                color="primary"
                                onClick={SupportMail}
                                size="sm"
                            >
                                Submit support
                            </Button>
                        </div>
                    </div> */}

                </div>

            </div>
        </>
    )
}
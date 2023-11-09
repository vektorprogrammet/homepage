const RegistrerSoker:React.FC = () => {
    return (
        <>
            <section>
                <form>
                    <section>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Fornavn</span>
                            </label>
                            <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Epost</span>
                            </label>
                            <input type="email" placeholder="" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Etternavn</span>
                            </label>
                            <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Telefon</span>
                            </label>
                            <input type="tel" pattern="[0-9]{8}" placeholder="" className="input input-bordered w-full max-w-xs" />
                        </div>
                    </section>
                    <section>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Linje</span>
                        </label>
                        <select className="select select-bordered">
                            <option disabled selected>Velg en linje</option>
                            <option>ÅBIJK</option>
                            <option>MTDT</option>
                            <option>MTKOM</option>
                            <option>etc...</option>
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Årstrinn</span>
                        </label>
                        <select className="select select-bordered">
                            <option disabled selected>Velg et årstrinn</option>
                            <option value={1}>1. Trinn</option>
                            <option value={2}>2. Trinn</option>
                            <option value={3}>3. Trinn</option>
                            <option value={4}>4. Trinn</option>
                            <option value={5}>5. trinn</option>
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Kjønn</span>
                        </label>
                        <select className="select select-bordered">
                            <option disabled selected>Velg et kjønn</option>
                            <option value={"mann"}>Mann</option>
                            <option value={"kvinne"}>Kvinne</option>
                            <option value={"annet"}>Annet</option>
                        </select>
                    </div>
                    </section>
                    <button className="btn">Button</button>
                </form>
            </section>
        </>
    );
}

export default RegistrerSoker
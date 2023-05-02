import React from 'react'

const Inventory = () => {
    return (
        <div>
            <div className='inventory'>
                <form className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label">First name</label>
                        <input type="text" className="form-control is-valid" required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Last name</label>
                        <input type="text" className="form-control is-valid" required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Last name</label>
                        <input type="text" className="form-control is-valid" required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>


                    <div class="col-12">
                        <button class="btn btn-primary" type="submit">Submit form</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Inventory
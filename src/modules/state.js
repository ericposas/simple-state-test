const state = {
  state: 'IDLE',
  getState(){
    return this.state
  },
  // we pass a callback into setState() that way we always tie the
  // ..state update into the application logic (to keep our data in-sync
  // ..with our view)
  setState(state, callback){
    this.state = state
    console.log(this.getState())
    if(callback) callback()
  }
}

export default state

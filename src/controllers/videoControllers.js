//export 해주면 다른 파일에서 이 함수를 import할 수 있다. 
export const trending = (req, res) => res.send("watch trending video! ");
export const edit = (req, res) => res.send("edit video! ");
export const remove = (req, res) => res.send("delete video! ");
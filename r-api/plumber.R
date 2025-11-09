library(plumber)
#* Echo back
#* @get /ping
function() {
  list(msg="pong")
}

#* Run a computation and return JSON
#* @post /predict
#* @serializer json
function(req, res) {
  body <- jsonlite::fromJSON(req$postBody)
  # We do r work here
  list(result = sum(body$values))
}

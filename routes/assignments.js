let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    const aggregateQuery = Assignment.aggregate();
    const options = {
        page : parseInt(req.query.page, 10) || 1,
        limit : parseInt(req.query.limit, 10) || 10
    }

    Assignment.aggregatePaginate(
        aggregateQuery,options,(err, assignments) => {
            if(err){
                res.send(err)
            }
            res.send(assignments)
        }

    )
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({_id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.title = req.body.title;
    assignment.dueDate = req.body.dueDate;
    assignment.isDone = req.body.isDone;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.title} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");

    Assignment.findByIdAndUpdate(req.body.id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    let assignmentId = req.params.id;

    console.log('delete ', assignmentId)
    Assignment.findByIdAndRemove(assignmentId, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.title} deleted`});
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };

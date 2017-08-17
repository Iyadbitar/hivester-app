const ActionsExporter = require('./classes/actions-exporter.class');
actionsExporter = new ActionsExporter();


// get workspace ID from script arguments
const workspaceId = process.argv[2] ? process.argv[2] : null;

const destinationFile = process.argv[3] ? process.argv[3] : null;

// fail if no workspace ID provided
if(false === !!workspaceId) {
  console.error('Workspace ID cannot be found, Please provide the workspaceId as first argument to this script');
  process.exit(1);
}


actionsExporter.toCSV().exportWorkspace(workspaceId,
  (data) => {
    console.log(data);
    process.exit(0);
  })

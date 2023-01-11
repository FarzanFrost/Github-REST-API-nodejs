const {Octokit} = require('octokit');
require('dotenv').config();

const octokit = new Octokit( {

    auth: process.env.GITHUB_TOKEN,

} );


async function run(){

    // get user details
    const { data : user } = await octokit.request('GET /user');
    console.log(`authenticated as ${user.login}`);
    console.log(process.env.GITHUB_TOKEN);

    //get a repository
    // const { data : repo } = await octokit.request('GET /repos/{owner}/{repo}' , {

    //     owner : user.login,
    //     repo : 'Flash'

    // });

    // console.log(repo);

    //creating a new repositroy

    // const newRepoName = 'Github REST API nodejs';

    // const createdRepository = await octokit.request( "POST /user/repos" , {

    //     name : newRepoName,
    //     'private':false

    // } )

    // console.log(createdRepository)

    //List repository issues

    // const issuesFromRepository = await octokit.request( 'GET /repos/{owner}/{repo}/issues{?milestone,state,assignee,creator,mentioned,labels,sort,direction,since,per_page,page}' , {

    //     owner : user.login,
    //     repo : 'Flash' 

    // } );
    // console.log("List of issues in Flash")
    // console.log( issuesFromRepository );

    //get workflows from repo
    const workflows = await octokit.request( 'GET /repos/{owner}/{repo}/actions/workflows{?per_page,page}' , {

        owner : user.login,
        repo : 'Action-test'

    } );
 
    // console.log(workflows.data.workflows[0].id)

    //Create workflow dispatch event

    const response = await octokit.request( 'POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches' , {

        owner : user.login,
        repo : 'Action-test',
        workflow_id : workflows.data.workflows[0].id,
        ref : 'main'

    } );

    console.log(response);

    //enable a workflow
    
    // const response2 = await octokit.request( 'PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable' , {

    //     owner : user.login,
    //     repo : 'Action-test',
    //     workflow_id : workflows.data.workflows[0].id

    // } )

    // console.log( response2 )

}

run();
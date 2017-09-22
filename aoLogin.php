 <?php
    header("location: /backend/public/home");

    // LOGIN USER 
    $article = new stdClass(); 
    $article -> email = _POST['email'];
    $article -> password = _POST['password'];
    /*
    $article->email = "user@tempExample.com"; 
    $article->password = "test"; 
    */
    $json_data = json_encode($article);

    //Function to check if the request is an AJAX request
    /*function is_ajax() {
      return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    }*/

    //if (is_ajax()) {
      //if (isset($_POST['email']) && !empty($_POST['email'])) { //Checks if email value exists
        
        if ($_POST['email'] === "admin@example.com") { //Checks what user is logging in
            admin_login();
        } else {
            public_login();
        }
      //}
    //}
    

    /************************/
    /* Admin login function */
    /************************/

    function admin_login() {
        
        $post = file_get_contents('https://tkeith.com/aos-testing/admin/login',null,stream_context_create(array( 
            'http' => array('method' => 'POST', 
                            'header' => "Content-type: application/json\r\n". "Connection: close\r\n" . "Content-length: " . strlen($json_data) . "\r\n", 
                            'content' => $json_data, 
                           ), 
        ))); 

       $return = $_POST;

        $jfo = json_decode($post); 
        // read the title value 
        $jtoken = $jfo->auth_token; 
        echo $jtoken; 
        
        $return["json"] = json_encode($return);
        echo json_encode($return);
        
        
        header("location: /backend/public/home");
    }


    /*************************/
    /* Public login function */
    /*************************/

    function public_login() {
        $post = file_get_contents('https://tkeith.com/aos-testing/public/login',null,stream_context_create(array( 
            'http' => array('method' => 'POST', 
                            'header' => "Content-type: application/json\r\n". "Connection: close\r\n" . "Content-length: " . strlen($json_data) . "\r\n", 
                            'content' => $json_data, 
                           ), 
        ))); 

        $return = $_POST;

        $jfo = json_decode($post); 
        // read the title value 
        $jtoken = $jfo->auth_token; 
        echo $jtoken; 

        $return["json"] = json_encode($return);
        echo json_encode($return);
        
    }

    exit;
?>


<!--
function test_function(){
  $return = $_POST;
  
  //Do what you need to do with the info. The following are some examples.
  //if ($return["favorite_beverage"] == ""){
  //  $return["favorite_beverage"] = "Coke";
  //}
  //$return["favorite_restaurant"] = "McDonald's";
  
  $return["json"] = json_encode($return);
  echo json_encode($return);
}
*/


/*
// LOGIN ADMIN 
    $article = new stdClass(); 
    $article->email = "admin@example.com"; 
    $article->password = "admin"; 

    $json_data = json_encode($article); 
    
    $post = file_get_contents('https://tkeith.com/aos-testing/admin/login',null,stream_context_create(array(    
        'http' => array('method' => 'POST',   
                        'header' => "Content-type: application/json\r\n". "Connection: close\r\n" . "Content-length: " . strlen($json_data) . "\r\n", 
                        'content' => $json_data, ), 
    ))); 

    if ($post) { 
        echo $post; 
    } else { 
        echo "POST failed"; 
    } 

    $jfo = json_decode($post); 

    // read the title value 
    $jtoken = $jfo->auth_token; 
    echo $jtoken; 


// LOGIN USER 
$article = new stdClass(); 
$article->email = "user@tempExample.com"; 
$article->password = "test"; 
$json_data = json_encode($article); 
$post = file_get_contents('https://tkeith.com/aos-testing/public/login',null,stream_context_create(array( 
    'http' => array('method' => 'POST', 
                    'header' => "Content-type: application/json\r\n". "Connection: close\r\n" . "Content-length: " . strlen($json_data) . "\r\n", 
                    'content' => $json_data, ), 
    ))); 
    
    $jfo = json_decode($post); 

    // read the title value 
    $jtoken = $jfo->auth_token; 
    echo $jtoken; 
*/
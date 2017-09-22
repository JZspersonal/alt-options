angular.module("myApp.services").factory('tokenStore', ['$window', function($window){
  return {
      memorize: function( value ){
        try{
          if( $window.Storage ){
            $window.localStorage.setItem( 'token', $window.JSON.stringify( value ) );
            return true;
          } else {
            return false;
          }
        } catch( error ){
          console.error( error, error.message );
        }
        return false;
      },
      recall: function( ){
        try{
          if( $window.Storage ){
            return $window.JSON.parse( $window.localStorage.getItem( 'token' ) )
          } else {
            return false;
          }
        } catch( error ){
          console.error( error, error.message );
        }
        return false;
      }
    }
}]);

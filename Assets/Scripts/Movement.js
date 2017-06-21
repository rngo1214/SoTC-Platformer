#pragma strict
public var jumpHeight = 0;
private var jumpNum = 0;
public var maxJumps = 2;
public var moveSpeed = 5;
private var facingRight = true;
private var movingLeft = false;
private var movingRight = false;
function Start () {
	GetComponent.<Rigidbody2D>().freezeRotation = true;
}

function Update () {
	var xvel;
	var yvel;
	if(Input.GetKeyDown(KeyCode.W) && CanJump()){
		xvel = GetComponent.<Rigidbody2D>().velocity.x;
		GetComponent.<Rigidbody2D>().velocity = new Vector2(xvel, jumpHeight);
		jumpNum ++;
	}
	else if(Input.GetKeyDown(KeyCode.A)){
		movingLeft = true;
		movingRight = false;
	}
	else if(Input.GetKeyDown(KeyCode.D)){
		movingRight = true;
		movingLeft = false;
	}
	else if(Input.GetKeyUp(KeyCode.A)){
		movingLeft = false;
	}
	else if(Input.GetKeyUp(KeyCode.D)){
		movingRight = false;
	}
	if(movingLeft){
		yvel = GetComponent.<Rigidbody2D>().velocity.y;
		GetComponent.<Rigidbody2D>().velocity = new Vector2(-1*moveSpeed, yvel);
		if(facingRight){
			Flip();
		}
	}
	else if(movingRight){
		yvel = GetComponent.<Rigidbody2D>().velocity.y;
		GetComponent.<Rigidbody2D>().velocity = new Vector2(moveSpeed, yvel);
		if(!facingRight){
			Flip();
		}
	}
}
function OnCollisionEnter2D(coll: Collision2D){
	if(coll.gameObject.CompareTag("Ground")){
		jumpNum = 0;
	}
}
function CanJump(){
	return jumpNum < maxJumps;
}
function Flip(){
	var flipScale = GetComponent.<Rigidbody2D>().transform.localScale;
	flipScale.x *= -1;
	GetComponent.<Rigidbody2D>().transform.localScale = flipScale;
	facingRight = !facingRight;
}
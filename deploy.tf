provider "aws" {
  access_key = "${var.aws_access_key_id}"
  secret_key = "${var.aws_secret_access_key}"
  region     = "us-east-2"
}

data "template_file" "script" {
    template = "${file("./deploy-script.sh.tpl")}"
    vars {
        git_key     = "${file("./git.key")}"
        git_branch  = "${var.git_branch}"
        db_host     = "${aws_db_instance.clean_air_db.address}"
        db_username = "${var.db_username}"
        db_password = "${var.db_password}"
    }
}

resource "aws_instance" "clean_air" {
  ami                    = "ami-0c55b159cbfafe1f0"
  instance_type          = "t2.micro"
  user_data              = "${data.template_file.script.rendered}"
  vpc_security_group_ids = ["${aws_security_group.server.id}"]

  tags {
    Name = "clean-air"
  }
}

resource "aws_db_instance" "clean_air_db" {
  identifier             = "clean-air-db"
  allocated_storage      = 20
  storage_type           = "gp2"
  engine                 = "mysql"
  engine_version         = "5.7"
  instance_class         = "db.t2.micro"
  name                   = "clean_air"
  username               = "${var.db_username}"
  password               = "${var.db_password}"
  parameter_group_name   = "default.mysql5.7"
  skip_final_snapshot    = true
  vpc_security_group_ids = ["${aws_security_group.database.id}"]
}

resource "aws_security_group" "server" {
  name = "clean-air-server-security-group"
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

resource "aws_security_group" "database" {
  name = "clean-air-db-security-group"
  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
  egress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

output "public_ip" {
  value = "${aws_instance.clean_air.public_ip}"
}

variable "aws_access_key_id" { }
variable "aws_secret_access_key" { }
variable "db_username" { }
variable "db_password" { }
variable "git_branch" { }
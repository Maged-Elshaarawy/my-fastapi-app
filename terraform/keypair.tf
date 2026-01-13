resource "tls_private_key" "ec2" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "ec2" {
  key_name   = "lab"
  public_key = tls_private_key.ec2.public_key_openssh
}

resource "local_sensitive_file" "lab_pem" {
  filename        = "${path.module}/lab.pem"
  content         = tls_private_key.ec2.private_key_pem
  file_permission = "0400"
}

resource "local_sensitive_file" "lab_pem_ansible" {
  filename        = "${path.root}/../ansible/lab.pem"
  content         = tls_private_key.ec2.private_key_pem
  file_permission = "0400"
}

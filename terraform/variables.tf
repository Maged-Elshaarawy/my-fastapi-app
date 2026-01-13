variable "aws_region" {
  type    = string
  default = "us-west-2"
}

variable "instance_count" {
  type    = number
  default = 3
}
variable "instance_type" {
  type    = string
  default = "t3.medium"
}